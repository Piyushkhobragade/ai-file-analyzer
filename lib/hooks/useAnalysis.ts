// Custom hook for file analysis management
import { useState, useCallback } from 'react';
import { appConfig } from '@/config/app.config';
import type { AnalysisResult, AnalysisError } from '@/types/analysis.types';

interface UseAnalysisReturn {
    results: AnalysisResult[];
    errors: AnalysisError[];
    isAnalyzing: boolean;
    progress: string;
    analyzeFiles: (files: File[], detailLevel?: 'quick' | 'standard' | 'detailed') => Promise<void>;
    clearResults: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
    const [results, setResults] = useState<AnalysisResult[]>([]);
    const [errors, setErrors] = useState<AnalysisError[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState('');

    const analyzeFiles = useCallback(async (files: File[], detailLevel: 'quick' | 'standard' | 'detailed' = 'standard') => {
        if (files.length === 0) return;

        setIsAnalyzing(true);
        setErrors([]);
        setResults([]);

        const newResults: AnalysisResult[] = [];
        const newErrors: AnalysisError[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setProgress(`Analyzing ${i + 1} of ${files.length}: ${file.name}... (${detailLevel} mode)`);

                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('detailLevel', detailLevel);

                    const response = await fetch(appConfig.api.endpoints.analyze, {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();

                    if (!data.success) {
                        throw new Error(data.error || 'Analysis failed');
                    }

                    newResults.push({
                        fileName: file.name,
                        data: data.data,
                        timestamp: new Date(),
                    });
                } catch (err: any) {
                    newErrors.push({
                        fileName: file.name,
                        error: err.message,
                    });
                }

                // Update results progressively
                setResults([...newResults]);
                setErrors([...newErrors]);
            }
        } finally {
            setIsAnalyzing(false);
            setProgress('');
        }
    }, []);

    const clearResults = useCallback(() => {
        setResults([]);
        setErrors([]);
        setProgress('');
    }, []);

    return {
        results,
        errors,
        isAnalyzing,
        progress,
        analyzeFiles,
        clearResults,
    };
}

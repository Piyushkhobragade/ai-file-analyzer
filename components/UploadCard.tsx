"use client";

import React, { useState } from 'react';
import { DropZone } from './DropZone';
import { FilePreview } from './FilePreview';
import { ResultsGrid } from './ResultsGrid';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AnalysisData {
    summary: string;
    keywords: string[];
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    confidence: number;
}

interface ResultItem {
    fileName: string;
    data: AnalysisData;
}

export function UploadCard() {
    const [files, setFiles] = useState<File[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<ResultItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<string>("");

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles((prev) => [...prev, ...newFiles]);
        // Don't clear results immediately to allow adding more files
        setError(null);
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAnalyze = async () => {
        if (files.length === 0) return;

        setIsAnalyzing(true);
        setError(null);
        setResults([]); // Clear previous results

        const newResults: ResultItem[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setProgress(`Analyzing ${i + 1} of ${files.length}: ${file.name}...`);

                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (!data.success) {
                    throw new Error(`Failed to analyze ${file.name}: ${data.error}`);
                }

                newResults.push({
                    fileName: file.name,
                    data: data.data
                });

                // Update results progressively
                setResults([...newResults]);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
            setProgress("");
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            <div className="w-full max-w-xl">
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-peacock-teal/5 via-transparent to-pitambar-yellow/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="mb-8 text-center space-y-2">
                            <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                                File Analyzer
                            </h1>
                            <p className="text-sm text-gray-300 font-medium">
                                Upload your documents for divine analysis
                            </p>
                        </div>

                        <DropZone onFilesSelected={handleFilesSelected} />

                        <FilePreview files={files} onRemove={handleRemoveFile} />

                        {error && (
                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {files.length > 0 && (
                            <div className="mt-8 flex flex-col items-center gap-4">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="px-8 py-3 bg-gradient-to-r from-pitambar-yellow to-pitambar-light text-krishna-blue text-sm font-bold rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        `Analyze ${files.length} File${files.length > 1 ? 's' : ''}`
                                    )}
                                </button>

                                {isAnalyzing && (
                                    <p className="text-xs text-pitambar-yellow animate-pulse">
                                        {progress}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Grid Display */}
            <ResultsGrid results={results} />
        </div>
    );
}

import React from 'react';
import { AnalysisResult } from './AnalysisResult';

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

interface ResultsGridProps {
    results: ResultItem[];
}

export function ResultsGrid({ results }: ResultsGridProps) {
    if (results.length === 0) return null;

    return (
        <div className="mt-12 w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, index) => (
                    <div key={index} className="h-full">
                        <AnalysisResult data={result.data} fileName={result.fileName} />
                    </div>
                ))}
            </div>
        </div>
    );
}

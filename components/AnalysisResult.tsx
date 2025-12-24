import React from 'react';
import { Sparkles, Tag, BarChart3, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/Badge';
import { generatePDF } from '@/lib/pdfGenerator';
import { content } from '@/config/content.config';
import { formatConfidence } from '@/lib/utils/formatters';
import type { AnalysisData } from '@/types/analysis.types';

interface AnalysisResultProps {
    data: AnalysisData;
    fileName: string;
}

export function AnalysisResult({ data, fileName }: AnalysisResultProps) {
    const handleDownload = () => {
        generatePDF(fileName, data);
    };

    return (
        <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between text-peacock-teal">
                <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="text-lg font-semibold text-white truncate max-w-[200px]" title={fileName}>
                        {fileName}
                    </h3>
                </div>
                <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    title="Download Report"
                >
                    <Download className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm flex flex-col">
                {/* Summary Section */}
                <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Summary</h4>
                    <p className="text-gray-200 leading-relaxed text-sm">
                        {data.summary}
                    </p>
                </div>

                {/* Keywords Section */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {data.keywords.map((keyword, idx) => (
                            <Badge key={idx} variant="gold">
                                {keyword}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Metrics Section */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-auto">
                    <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gray-500 uppercase">Sentiment</h4>
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                data.sentiment === 'Positive' ? "bg-green-500" :
                                    data.sentiment === 'Negative' ? "bg-red-500" : "bg-yellow-500"
                            )} />
                            <span className="text-sm font-semibold text-white">{data.sentiment}</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gray-500 uppercase">{content.results.sections.confidence}</h4>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-pitambar-yellow" />
                            <span className="text-sm font-semibold text-white">{formatConfidence(data.confidence)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

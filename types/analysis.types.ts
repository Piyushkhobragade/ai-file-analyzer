// Type definitions for analysis-related data structures

export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

export interface AnalysisData {
    summary: string;
    keywords: string[];
    sentiment: SentimentType;
    confidence: number; // 0.0 to 1.0
}

export interface AnalysisResult {
    fileName: string;
    data: AnalysisData;
    timestamp?: Date;
}

export interface AnalysisError {
    fileName: string;
    error: string;
    code?: string;
}

export interface AnalysisResponse {
    success: boolean;
    data?: AnalysisData;
    error?: string;
}

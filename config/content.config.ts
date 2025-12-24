// Content configuration - all UI text in one place
// Makes it easy to update copy without touching components

export const content = {
    // Main page
    hero: {
        title: 'File Analyzer',
        subtitle: 'Upload your documents for divine analysis',
    },

    // Upload section
    upload: {
        dropzone: {
            idle: 'Drag & drop files here, or click to browse',
            active: 'Drop files here...',
            formats: 'Supports PDF, DOCX, PNG, JPG',
        },
        button: {
            analyze: 'Analyze',
            analyzing: 'Processing...',
        },
        progress: (current: number, total: number) =>
            `Analyzing ${current} of ${total}...`,
    },

    // Analysis results
    results: {
        title: 'Analysis Result',
        sections: {
            summary: 'Summary',
            keywords: 'Keywords',
            sentiment: 'Sentiment',
            confidence: 'Confidence',
        },
        download: 'Download Report',
    },

    // Error messages
    errors: {
        fileSize: (maxSize: number) =>
            `File too large. Max size is ${maxSize}MB`,
        fileType: 'File type not supported',
        uploadFailed: 'Upload failed. Please try again',
        analysisFailed: 'Analysis failed. Please try again',
        apiKeyMissing: 'API key not configured. Check your .env.local file',
        networkError: 'Network error. Check your connection',
        generic: 'Something went wrong. Please try again',
    },

    // Success messages
    success: {
        analysisComplete: 'Analysis complete!',
        pdfDownloaded: 'Report downloaded',
    },

    // Loading states
    loading: {
        analyzing: 'Analyzing your file...',
        uploading: 'Uploading...',
        generating: 'Generating report...',
    },
} as const;

export type Content = typeof content;

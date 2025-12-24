// Application configuration
// Central place for app-wide settings and constraints

export const appConfig = {
    // App metadata
    name: 'AI File Analyzer',
    description: 'Analyze documents and images with AI-powered insights',
    version: '1.0.0',
    author: 'Piyush Khobragade',

    // File upload constraints
    upload: {
        maxFileSize: 5 * 1024 * 1024, // 5MB in bytes
        maxFiles: 10, // max files in batch
        allowedTypes: {
            documents: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] as const,
            images: ['image/png', 'image/jpeg', 'image/jpg'] as const,
        },
        allowedExtensions: ['.pdf', '.docx', '.png', '.jpg', '.jpeg'] as const,
    },

    // API configuration
    api: {
        timeout: 30000, // 30 seconds
        retries: 2,
        endpoints: {
            analyze: '/api/analyze',
        },
    },

    // Particle animation settings
    particles: {
        count: {
            desktop: 100,
            mobile: 50,
        },
        trailEmissionRate: 3, // particles per mouse move
        mouseRadius: 150,
    },

    // Feature flags
    features: {
        batchProcessing: true,
        pdfReports: true,
        particleBackground: true,
    },

    // External links
    links: {
        github: 'https://github.com/Piyushkhobragade',
        documentation: '',
    },
};

export type AppConfig = typeof appConfig;

// Helper to get file type category
export const getFileTypeCategory = (mimeType: string): 'document' | 'image' | 'unknown' => {
    const docs = appConfig.upload.allowedTypes.documents as unknown as string[];
    const imgs = appConfig.upload.allowedTypes.images as unknown as string[];

    if (docs.includes(mimeType)) return 'document';
    if (imgs.includes(mimeType)) return 'image';
    return 'unknown';
};

// Helper to check if file type is allowed
export const isFileTypeAllowed = (mimeType: string): boolean => {
    const docs = appConfig.upload.allowedTypes.documents as unknown as string[];
    const imgs = appConfig.upload.allowedTypes.images as unknown as string[];

    return [...docs, ...imgs].includes(mimeType);
};

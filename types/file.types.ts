// Type definitions for file-related data structures

export type FileCategory = 'document' | 'image' | 'unknown';

export interface FileMetadata {
    name: string;
    size: number;
    type: string;
    category: FileCategory;
    lastModified: number;
}

export interface FileValidationResult {
    valid: boolean;
    error?: string;
}

export interface UploadProgress {
    fileName: string;
    progress: number; // 0-100
    status: 'pending' | 'uploading' | 'analyzing' | 'complete' | 'error';
}

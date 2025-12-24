// Utility functions for file validation
import { appConfig, isFileTypeAllowed } from '@/config/app.config';
import type { FileValidationResult } from '@/types/file.types';

export function validateFile(file: File, maxFileSizeMB?: number): FileValidationResult {
    // Check file type
    if (!isFileTypeAllowed(file.type)) {
        return {
            valid: false,
            error: `File type "${file.type}" is not supported. Please upload PDF, DOCX, PNG, or JPG files.`,
        };
    }

    // Check file size - use custom max size if provided, otherwise use default
    const maxSize = maxFileSizeMB
        ? maxFileSizeMB * 1024 * 1024
        : appConfig.upload.maxFileSize;

    if (file.size > maxSize) {
        const maxSizeMB = maxSize / (1024 * 1024);
        return {
            valid: false,
            error: `File "${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`,
        };
    }

    return { valid: true };
}

export function validateFiles(files: File[], maxFileSizeMB?: number): FileValidationResult {
    // Check number of files
    if (files.length > appConfig.upload.maxFiles) {
        return {
            valid: false,
            error: `Too many files. Maximum is ${appConfig.upload.maxFiles} files at once.`,
        };
    }

    // Validate each file
    for (const file of files) {
        const result = validateFile(file, maxFileSizeMB);
        if (!result.valid) {
            return result;
        }
    }

    return { valid: true };
}

export function getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1].toLowerCase()}` : '';
}

export function isValidExtension(fileName: string): boolean {
    const ext = getFileExtension(fileName);
    const extensions = appConfig.upload.allowedExtensions as unknown as string[];
    return extensions.includes(ext);
}

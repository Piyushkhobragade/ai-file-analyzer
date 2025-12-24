// Custom hook for file upload management
import { useState, useCallback } from 'react';
import { validateFiles } from '@/lib/utils/fileValidation';
import type { FileValidationResult } from '@/types/file.types';

export function useFileUpload() {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const addFiles = useCallback((newFiles: File[], maxFileSizeMB?: number) => {
        setError(null);

        // Validate new files with custom max size if provided
        const validation: FileValidationResult = validateFiles([...files, ...newFiles], maxFileSizeMB);

        if (!validation.valid) {
            setError(validation.error || 'Invalid files');
            return false;
        }

        setFiles(prev => [...prev, ...newFiles]);
        return true;
    }, [files]);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setError(null);
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
        setError(null);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        files,
        error,
        addFiles,
        removeFile,
        clearFiles,
        clearError,
    };
}

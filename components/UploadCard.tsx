"use client";

import React from 'react';
import { DropZone } from './DropZone';
import { FilePreview } from './FilePreview';
import { ResultsGrid } from './ResultsGrid';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Message } from './ui/Message';
import { useFileUpload } from '@/lib/hooks/useFileUpload';
import { useAnalysis } from '@/lib/hooks/useAnalysis';
import { useSettings } from '@/lib/context/SettingsContext';

export function UploadCard() {
    const { settings, t } = useSettings();
    const { files, error: fileError, addFiles, removeFile, clearError } = useFileUpload();
    const { results, errors: analysisErrors, isAnalyzing, progress, analyzeFiles } = useAnalysis();

    const handleFilesSelected = (newFiles: File[]) => {
        const success = addFiles(newFiles);
        // Auto-analyze if enabled and files were added successfully
        if (success && settings.autoAnalyze && newFiles.length > 0) {
            clearError();
            // Small delay to let the UI update
            setTimeout(() => {
                analyzeFiles([...files, ...newFiles], settings.analysisDetail);
            }, 100);
        }
    };

    const handleAnalyze = () => {
        if (files.length === 0) return;
        clearError();
        analyzeFiles(files, settings.analysisDetail);
    };

    // Combine errors for display
    const displayError = fileError || (analysisErrors.length > 0 ? analysisErrors[0].error : null);

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            <div className="w-full max-w-xl">
                <Card hover>
                    <div className="mb-8 text-center space-y-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                            {t.hero.title}
                        </h1>
                        <p className="text-sm text-gray-300 font-medium">
                            {t.hero.subtitle}
                        </p>
                        {settings.autoAnalyze && (
                            <p className="text-xs text-pitambar-yellow font-medium">
                                {t.hero.autoAnalyzeEnabled}
                            </p>
                        )}
                    </div>

                    <DropZone onFilesSelected={handleFilesSelected} />

                    <FilePreview files={files} onRemove={removeFile} />

                    {displayError && (
                        <div className="mt-4">
                            <Message type="error" message={displayError} />
                        </div>
                    )}

                    {files.length > 0 && !settings.autoAnalyze && (
                        <div className="mt-8 flex flex-col items-center gap-4">
                            <Button
                                onClick={handleAnalyze}
                                loading={isAnalyzing}
                                disabled={isAnalyzing}
                                size="lg"
                            >
                                {isAnalyzing
                                    ? t.upload.button.analyzing
                                    : `${t.upload.button.analyze} ${files.length} File${files.length > 1 ? 's' : ''}`
                                }
                            </Button>

                            {isAnalyzing && progress && (
                                <p className="text-xs text-pitambar-yellow animate-pulse">
                                    {progress}
                                </p>
                            )}
                        </div>
                    )}

                    {settings.autoAnalyze && isAnalyzing && progress && (
                        <div className="mt-4 text-center">
                            <p className="text-xs text-pitambar-yellow animate-pulse">
                                {progress}
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Results Grid */}
            <ResultsGrid results={results} />
        </div>
    );
}

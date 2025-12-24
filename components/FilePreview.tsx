"use client";

import React from 'react';
import { X, FileText, Image as ImageIcon } from 'lucide-react';
import { formatFileSize } from '@/lib/utils/formatters';
import { useSettings } from '@/lib/context/SettingsContext';

interface FilePreviewProps {
    files: File[];
    onRemove: (index: number) => void;
}

export function FilePreview({ files, onRemove }: FilePreviewProps) {
    const { t } = useSettings();

    if (files.length === 0) return null;

    // Helper to get appropriate icon based on file type
    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) {
            return <ImageIcon className="w-5 h-5 text-purple-400" />;
        }
        return <FileText className="w-5 h-5 text-peacock-teal" />;
    };

    return (
        <div className="w-full space-y-3 mt-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-200">{t.upload.preview.files}</h3>
                <span className="text-xs text-gray-400">{files.length} files</span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {files.map((file, index) => (
                    <div
                        key={`${file.name}-${index}`}
                        className="group flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:border-pitambar-yellow/30 hover:bg-white/10 transition-all duration-200"
                    >
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                {getFileIcon(file.type)}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                                    {file.name}
                                </span>
                                <span className="text-xs text-gray-500 group-hover:text-gray-400">
                                    {formatFileSize(file.size)}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => onRemove(index)}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label={t.upload.preview.remove}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/lib/context/SettingsContext';
import { appConfig } from '@/config/app.config';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export function DropZone({ onFilesSelected }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useSettings();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative group cursor-pointer flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out",
        isDragging
          ? "border-peacock-teal bg-peacock-teal/10"
          : "border-white/20 hover:border-pitambar-yellow/50 hover:bg-white/5",
        "backdrop-blur-sm"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
        multiple
        accept={appConfig.upload.allowedExtensions.join(',')}
      />

      <div className="flex flex-col items-center justify-center space-y-4 text-center p-6">
        <div className={cn(
          "p-4 rounded-full transition-colors duration-300 shadow-lg",
          isDragging
            ? "bg-peacock-teal/20 text-peacock-teal"
            : "bg-white/5 text-gray-400 group-hover:bg-pitambar-yellow/10 group-hover:text-pitambar-yellow"
        )}>
          <Upload className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
            {isDragging ? t.upload.dropzone.title : t.upload.dropzone.subtitle}
          </p>
          <p className="text-xs text-gray-400">
            {t.upload.dropzone.formats}
          </p>
        </div>
      </div>
    </div>
  );
}

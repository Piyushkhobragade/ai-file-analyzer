"use client";

import React, { useState, useEffect } from 'react';
import { Settings, X, Zap, Globe, Sliders, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/lib/context/SettingsContext';

interface SettingsMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsMenu({ isOpen, onClose }: SettingsMenuProps) {
    const [mounted, setMounted] = useState(false);
    const { settings, updateSettings, t } = useSettings();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Settings Panel */}
            <div className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {t.settings.title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Close settings"
                        >
                            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 space-y-6">
                        {/* Auto-Analyze Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-4 h-4 text-pitambar-yellow" />
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t.settings.autoAnalyze.title}
                                </h3>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {t.settings.autoAnalyze.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {t.settings.autoAnalyze.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => updateSettings({ autoAnalyze: !settings.autoAnalyze })}
                                    className={cn(
                                        "relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ml-3",
                                        settings.autoAnalyze ? 'bg-pitambar-yellow' : 'bg-gray-300 dark:bg-gray-600'
                                    )}
                                    aria-label="Toggle auto-analyze"
                                >
                                    <span
                                        className={cn(
                                            "absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out",
                                            settings.autoAnalyze ? 'translate-x-6' : 'translate-x-0'
                                        )}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Analysis Settings */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Sliders className="w-4 h-4 text-blue-500" />
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t.settings.analysisDetail.title}
                                </h3>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-2">
                                {(['quick', 'standard', 'detailed'] as const).map((detail) => (
                                    <button
                                        key={detail}
                                        onClick={() => updateSettings({ analysisDetail: detail })}
                                        className={cn(
                                            "w-full p-3 rounded-lg text-left transition-colors",
                                            settings.analysisDetail === detail
                                                ? 'bg-pitambar-yellow/20 border-2 border-pitambar-yellow text-gray-900 dark:text-white'
                                                : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                        )}
                                    >
                                        <p className="text-sm font-medium capitalize">
                                            {t.settings.analysisDetail[detail]}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {t.settings.analysisDetail[`${detail}Desc` as keyof typeof t.settings.analysisDetail]}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language Settings */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Globe className="w-4 h-4 text-green-500" />
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t.settings.language.title}
                                </h3>
                            </div>

                            <select
                                value={settings.language}
                                onChange={(e) => updateSettings({ language: e.target.value as any })}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-pitambar-yellow focus:border-transparent"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिन्दी (Hindi)</option>
                                <option value="mr">मराठी (Marathi)</option>
                                <option value="ta">தமிழ் (Tamil)</option>
                                <option value="te">తెలుగు (Telugu)</option>
                                <option value="bn">বাংলা (Bengali)</option>
                                <option value="es">Español (Spanish)</option>
                            </select>
                        </div>

                        {/* About Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Info className="w-4 h-4 text-gray-500" />
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t.settings.about.title}
                                </h3>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-2">
                                <p className="text-sm text-gray-900 dark:text-white font-medium">
                                    {t.settings.about.appName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t.settings.about.version}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t.settings.about.poweredBy}
                                </p>
                                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {t.settings.about.formats}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

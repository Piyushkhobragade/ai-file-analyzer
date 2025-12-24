"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from '@/config/translations';

export interface AppSettings {
    autoAnalyze: boolean;
    analysisDetail: 'quick' | 'standard' | 'detailed';
    language: Language;
}

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    t: typeof translations.en;
}

const defaultSettings: AppSettings = {
    autoAnalyze: true,
    analysisDetail: 'detailed',
    language: 'en',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [mounted, setMounted] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            try {
                setSettings(JSON.parse(savedSettings));
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        }
        setMounted(true);
    }, []);

    // Save settings to localStorage whenever they change
    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            localStorage.setItem('appSettings', JSON.stringify(settings));
        }
    }, [settings, mounted]);

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        setSettings((prev) => ({ ...prev, ...newSettings }));
    };

    // Get translations for current language
    const t = translations[settings.language] || translations.en;

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, t }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

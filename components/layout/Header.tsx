"use client";

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SettingsMenu } from '../SettingsMenu';

export function Header() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 right-0 z-30 p-4">
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-3 bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 backdrop-blur-lg rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Open settings"
                >
                    <Settings className="w-5 h-5 text-white" />
                </button>
            </header>

            <SettingsMenu
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </>
    );
}

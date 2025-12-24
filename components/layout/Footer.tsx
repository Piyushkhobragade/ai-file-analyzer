"use client";

import React from 'react';
import { Github, Linkedin, Mail, Code2, Sparkles } from 'lucide-react';
import { useSettings } from '@/lib/context/SettingsContext';

export function Footer() {
    const { t } = useSettings();

    return (
        <footer className="w-full mt-20 border-t border-white/10 bg-gradient-to-b from-transparent via-black/10 to-black/30 backdrop-blur-sm relative z-10">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About You - Left Section */}
                    <div className="text-center md:text-left space-y-3">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <Code2 className="w-5 h-5 text-pitambar-yellow" />
                            <h3 className="text-lg font-bold text-white">
                                Piyush
                            </h3>
                        </div>
                        <p className="text-sm text-gray-300 font-medium">
                            Web Developer | Crafting Modern Digital Experiences | Focused on Cloud & AI
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Transforming ideas into intelligent digital solutions through careful design, clean development, and continuous learning.
                        </p>
                    </div>

                    {/* Connect Section - Center */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-peacock-teal" />
                            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Connect
                            </h4>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <a
                                href="https://github.com/Piyushkhobragade"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 text-gray-400 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 border border-transparent hover:border-pitambar-yellow/30"
                                aria-label="GitHub Profile"
                            >
                                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/piyush-khobragade-934a15223/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 text-gray-400 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 border border-transparent hover:border-peacock-teal/30"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="mailto:piyushkhobragade2005@gmail.com"
                                className="group p-3 text-gray-400 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 border border-transparent hover:border-krishna-blue/30"
                                aria-label="Email Contact"
                            >
                                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                            <a
                                href="mailto:piyushkhobragade2005@gmail.com"
                                className="hover:text-pitambar-yellow transition-colors"
                            >
                                piyushkhobragade2005@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Technology Stack - Right Section */}
                    <div className="text-center md:text-right space-y-3">
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                            Technology Stack
                        </h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p className="flex items-center justify-center md:justify-end gap-2">
                                <span className="w-2 h-2 bg-peacock-teal rounded-full"></span>
                                Next.js 16
                            </p>
                            <p className="flex items-center justify-center md:justify-end gap-2">
                                <span className="w-2 h-2 bg-pitambar-yellow rounded-full"></span>
                                TypeScript
                            </p>
                            <p className="flex items-center justify-center md:justify-end gap-2">
                                <span className="w-2 h-2 bg-krishna-blue rounded-full"></span>
                                Tailwind CSS
                            </p>
                            <p className="flex items-center justify-center md:justify-end gap-2">
                                <span className="w-2 h-2 bg-peacock-teal rounded-full"></span>
                                Google Gemini AI
                            </p>
                            <p className="flex items-center justify-center md:justify-end gap-2">
                                <span className="w-2 h-2 bg-pitambar-yellow rounded-full"></span>
                                Custom UI
                            </p>
                            <p className="flex items-center justify-center md:justify-end gap-2">
                                <span className="w-2 h-2 bg-krishna-blue rounded-full"></span>
                                React Context
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/5">
                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            © 2025 All Rights Reserved • Designed & Developed with passion by{' '}
                            <span className="text-pitambar-yellow font-semibold">
                                Piyush Khobragade
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

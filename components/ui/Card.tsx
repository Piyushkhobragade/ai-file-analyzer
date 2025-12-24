"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glassEffect?: boolean;
    hover?: boolean;
}

export function Card({
    children,
    className,
    glassEffect = true,
    hover = false
}: CardProps) {
    return (
        <div
            className={cn(
                'rounded-3xl shadow-2xl border p-8 relative overflow-hidden',
                glassEffect && 'bg-white/10 backdrop-blur-2xl border-white/10',
                hover && 'group',
                className
            )}
        >
            {glassEffect && (
                <div className="absolute inset-0 bg-gradient-to-br from-peacock-teal/5 via-transparent to-pitambar-yellow/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

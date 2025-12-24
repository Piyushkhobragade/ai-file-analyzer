"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'teal' | 'gold' | 'blue';
    className?: string;
}

const variantStyles = {
    default: 'bg-white/10 border-white/40 text-white',
    teal: 'bg-peacock-teal/10 border-peacock-teal/40 text-peacock-teal',
    gold: 'bg-pitambar-yellow/10 border-pitambar-yellow/40 text-pitambar-yellow shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    blue: 'bg-blue-500/10 border-blue-500/40 text-blue-400',
};

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'px-3 py-1 border text-xs font-medium rounded-full inline-block',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}

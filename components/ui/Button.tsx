"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-pitambar-yellow to-pitambar-light text-krishna-blue hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    ghost: 'text-white hover:bg-white/10',
    danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'rounded-xl font-bold transition-all duration-300',
                'hover:scale-[1.02] active:scale-[0.98]',
                'disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100',
                'flex items-center gap-2 justify-center',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}

"use client";

import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type MessageType = 'error' | 'success' | 'info' | 'warning';

interface MessageProps {
    type: MessageType;
    message: string;
    className?: string;
}

const config = {
    error: {
        icon: XCircle,
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        text: 'text-red-200',
        iconColor: 'text-red-400',
    },
    success: {
        icon: CheckCircle2,
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        text: 'text-green-200',
        iconColor: 'text-green-400',
    },
    info: {
        icon: Info,
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        text: 'text-blue-200',
        iconColor: 'text-blue-400',
    },
    warning: {
        icon: AlertCircle,
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        text: 'text-yellow-200',
        iconColor: 'text-yellow-400',
    },
};

export function Message({ type, message, className }: MessageProps) {
    const { icon: Icon, bg, border, text, iconColor } = config[type];

    return (
        <div
            className={cn(
                'p-4 border rounded-xl text-sm flex items-center gap-3',
                bg,
                border,
                text,
                className
            )}
        >
            <Icon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
            <span>{message}</span>
        </div>
    );
}

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SettingsProvider } from "@/lib/context/SettingsContext";
import type { ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SettingsProvider>
            {children}
        </SettingsProvider>
    );
}

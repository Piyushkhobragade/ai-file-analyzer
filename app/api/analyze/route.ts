import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithGemini } from '@/services/aiService';

/**
 * API Route: /api/analyze
 * Method: POST
 * 
 * Handles file uploads and triggers the Gemini AI analysis.
 */

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        console.log('[API] Received analysis request');

        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const detailLevel = (formData.get('detailLevel') as string) || 'standard';

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file size (Max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ success: false, error: 'File size exceeds 10MB limit' }, { status: 400 });
        }

        console.log(`[API] Processing file: ${file.name}, Type: ${file.type}, Detail: ${detailLevel}`);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Call Gemini Service with detail level
        const analysisResult = await analyzeWithGemini(buffer, file.type, detailLevel as 'quick' | 'standard' | 'detailed');

        return NextResponse.json({
            success: true,
            data: analysisResult,
            error: null
        });

    } catch (error: any) {
        console.error('[API] Error:', error.message);

        // Handle missing API key specifically
        if (error.message.includes('GEMINI_API_KEY')) {
            return NextResponse.json(
                { success: false, error: 'Server Configuration Error: Missing Gemini API Key' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

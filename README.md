# AI File Analyzer

A file analysis tool I built using Google's Gemini 2.0 AI. Upload your documents and images to get instant analysis with summaries, keywords, and sentiment detection.

## What it does

This app lets you upload files (PDF, DOCX, images) and analyzes them using AI. I added some cool features like:

- Multi-format support (PDF, DOCX, PNG, JPG)
- Three analysis modes - quick, standard, or detailed depending on what you need
- Auto-analyze option so files get processed right after upload
- Multi-language UI (English, Spanish, Hindi, Marathi, Tamil, Telugu, Bengali)
- Custom theme with particle effects in the background
- Settings that persist across sessions

## Getting Started

First, clone the repo and install dependencies:

```bash
npm install
```

You'll need a Gemini API key. Get one from [Google AI Studio](https://makersuite.google.com/app/apikey), then create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 and you're good to go.

## How I built it

**Tech stack:**
- Next.js 16 with the new App Router
- TypeScript for type safety
- Tailwind CSS v4 for styling
- Google Gemini 2.0 Flash for the AI analysis
- Lucide React for icons

**Project structure:**

```
ai-file-analyzer/
├── app/              # Next.js pages and API routes
├── components/       # React components
├── config/           # App configuration
├── lib/              # Utilities and custom hooks
├── services/         # Gemini AI integration
└── types/            # TypeScript types
```

## Settings

Click the settings icon to configure:
- Auto-analyze toggle
- Analysis detail level (quick/standard/detailed)
- Language preference

## Building for production

```bash
npm run build
npm start
```

## What's next

Some things I'm thinking about adding:
- Excel and CSV support
- Batch processing for multiple files
- PDF export for analysis results
- History of past analyses
- Custom prompt templates

## Contributing

If you find bugs or have ideas, feel free to open an issue or PR.

## License

MIT

## About

Built by Piyush Khobragade

- GitHub: [@Piyushkhobragade](https://github.com/Piyushkhobragade)
- LinkedIn: [Piyush Khobragade](https://www.linkedin.com/in/piyush-khobragade-934a15223/)
- Email: piyushkhobragade2005@gmail.com

---

Made with Next.js and Google Gemini AI

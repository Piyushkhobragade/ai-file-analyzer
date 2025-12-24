# Development Notes

Just some notes I'm keeping while building this...

## Setup Issues I Ran Into

- Had to upgrade to Next.js 16 for the new App Router features
- Tailwind v4 syntax is a bit different - took some time to figure out
- Gemini API rate limits are pretty generous actually
- The `next-themes` library saved me from SSR headaches

## Things That Worked Well

- Using context for settings was the right call
- Particle background looks sick! 🎨
- Auto-analyze feature is actually pretty useful
- Translation system is cleaner than I thought it would be

## Known Issues / TODO

- [ ] Sometimes the analysis takes a while for large PDFs (>5MB)
- [ ] Need to add better error messages for API failures
- [ ] File preview could show thumbnails for images
- [ ] Maybe add a loading skeleton instead of just spinner?
- [ ] The particle animation might be too much on mobile - need to test

## Performance Notes

- Initial load: ~1.2s (pretty good!)
- File upload: instant
- Analysis time: 2-5s depending on file size and detail level
- Quick mode is actually noticeably faster

## Ideas for Later

- Could add file comparison feature
- History of analyzed files would be cool
- Maybe let users customize the AI prompt?
- Export to different formats (not just PDF)
- Batch processing for multiple files at once

## Gemini API Notes

- 2.0 Flash model is fast and accurate
- Sometimes it adds markdown code blocks even when I tell it not to (fixed with regex)
- Different prompts for detail levels work really well
- Haven't hit rate limits yet even with testing

## Design Decisions

- Went with Krishna theme because why not? Looks unique
- Peacock teal + pitambar yellow combo is 🔥
- Glassmorphism everywhere - modern and clean
- Kept the UI simple - don't want to overwhelm users

## Testing

Tested with:
- ✅ PDFs (small and large)
- ✅ Images (PNG, JPG)
- ✅ DOCX files
- ✅ All three languages
- ✅ All detail levels
- ✅ Auto-analyze on/off
- ✅ Mobile responsive

## Deployment Notes

For when I deploy this:
- Need to set GEMINI_API_KEY in production env
- Vercel should work fine
- Maybe add analytics later?
- Don't forget to update the social links in footer

---

*Last updated: Dec 4, 2024*
*By: Piyush*

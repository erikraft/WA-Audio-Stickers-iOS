# ErikrafT Sound Stickers — Web editor for iPhone, iPad and desktop

A local-first web editor for preparing short video clips with audio and exporting a portable ZIP archive. This is the iOS alternative to a native App Store app.

**Live site after GitHub Pages is enabled:** https://erikraft.github.io/WA-Audio-Stickers-iOS/

## Features

- Import local video and image files, plus an optional separate audio track.
- Preview the source and listen with a custom audio player (play/pause, seek, mute, volume and visual progress).
- Trim each clip to a maximum of 10 seconds.
- Record the composition to MP4 or WebM according to browser support.
- Build a ZIP archive with all rendered clips and a JSON manifest.
- Use the iOS Share Sheet when it supports files; otherwise download the result.
- Process selected media in the browser; files are not uploaded to a server.

## WhatsApp compatibility

The generated ZIP is an **archive/export package**, not a native WhatsApp sticker pack. The public third-party sticker integration documents WebP sticker assets and a metadata ContentProvider; it does not document a public API for importing a sound-sticker package with linked audio.

To create an actual sound sticker, open an exported MP4 in WhatsApp's own sticker creator (Sticker picker → Create) and finish the sound-sticker flow inside WhatsApp when the feature is available to your account. Rollout and feature availability vary by account, app build and platform. Otherwise, the MP4 can still be shared as a regular video.

Browser recording support differs. The app checks MediaRecorder MIME support at runtime. Safari 26 adds WebCodecs audio encoding support, but video recording MIME support must still be checked on the actual device. Some browsers may export WebM instead of MP4; check the resulting MIME type before using the clip with WhatsApp.

## Browser extension from another author

For the extension workflow that integrates with WhatsApp Web, see [vish-4-1/WA-audio-stickers-en](https://github.com/vish-4-1/WA-audio-stickers-en). **That extension is not created, maintained, owned or officially affiliated with ErikrafT.** Its README credits an upstream project and the repository is licensed under PolyForm Noncommercial 1.0.0. This repository does not copy or bundle its source code.

## Development

Requirements: Node.js 22 or newer.

~~~bash
npm install
npm test
npm run dev
npm run build
npm run preview
~~~

## Deployment

The GitHub Actions workflow builds Vite and publishes dist/ to GitHub Pages. In **Settings → Pages**, select **GitHub Actions** as the build and deployment source. After the first successful deployment, the site is available at the URL above.

## Privacy

Selected media is read and processed in the browser. The app does not upload selected video/audio files. Static app assets are served from GitHub Pages.

## Credits and implementation boundary

The sound-sticker concept and WhatsApp Web integration are studied from the public extension linked above, but this repository contains an independent implementation. It does not reuse that project's conversion engine or WhatsApp-internal integration code. WhatsApp and Meta are trademarks of their respective owners.

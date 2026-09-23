# Rechitta · Berkeley Square North

A responsive Nuxt 3 implementation of the supplied Figma assignment using Vue 3, TypeScript, and Tailwind CSS.

## Features

* **Audio-reactive orb**

  * Real-time microphone frequency analysis using the Web Audio API.
  * Bass, mid, and high frequencies control the orb's visual response.
  * Scale, skew, rotation, opacity, and color react to audio.

* **Voice interaction**

  * Browser speech recognition for optional voice input.
  * Microphone and speech features require explicit user interaction.


* **Nuxt SSR**

  * Server-side rendering enabled.
  * Property data fetched with `useFetch` and transferred through the Nuxt payload and randomised time mock api applied
  * Nitro API endpoints for property data and guide requests.
  * Browser-only APIs isolated from SSR code.

* **Performance**

  * WebP derivatives generated from original photographs.
  * Five-minute browser/CDN caching for public property data and images.

* **Accessibility**

  * Keyboard focus indicators.
  * Responsive layouts and fluid typography.

* **Error handling**

  * Network errors with retry.
  * Image loading failures.
  * Empty residence search results.
  * Microphone permission and device failures.
  * Loading and persistence states.

* **Testing**

  * ESLint.
  * TypeScript type checking.
  * Prettier checks.
  * Audio-reactivity tests using synthetic frequency data.
  * API tests.
  * SSR and route smoke tests.
  * Asset delivery and 404 checks.
  * Production build verification.

## Tech Stack

* Nuxt 3
* Vue 3
* TypeScript
* Tailwind CSS
* Nitro
* Web Audio API
* Jest / automated browser tests

## Development

```bash
npm ci
npm run dev
```

Copy `.env.example` to `.env` if you need to configure the public site URL.

Use Node.js 22.12+.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test:audio
npm run test:api
npm run test:smoke
npm run build
npm start
```

## Project Structure

```text
pages/                 Application routes
components/ui/         Shared UI components
components/onboarding/ Onboarding components
components/property/   Property components
components/agent/      Guide/agent components
composables/           Browser-specific functionality
server/data/           Typed property data
server/api/             Nitro API endpoints
assets/css/             Feature-specific styles
public/images/figma/    Original Figma assets
```

## Assets

Original PNG/SVG exports are stored in `public/images/figma/`.

Generate optimized WebP versions with:

```bash
npm run images:optimize
```

Fonts are self-hosted using Fontsource packages.

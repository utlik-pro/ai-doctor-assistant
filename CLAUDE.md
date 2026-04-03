# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Conference landing page for an AI Doctor Assistant event. Single-page React app with a dark navy/cyan theme, built with Lovable.dev.

## Commands

- `npm run dev` — start dev server on port 8080
- `npm run build` — production build (outputs to `dist/`)
- `npm run lint` — ESLint
- `npm run test` — run Vitest once
- `npm run test:watch` — run Vitest in watch mode

## Tech Stack

- React 18 + TypeScript + Vite (SWC plugin)
- Tailwind CSS 3 with shadcn/ui components (Radix primitives)
- React Router v6 (BrowserRouter)
- TanStack React Query
- Vitest + Testing Library (jsdom) for unit tests
- Playwright for e2e tests

## Architecture

**Single-page landing**: `src/pages/Index.tsx` composes all sections in order: `EventHeader` → `HeroSection` → `SpeakersSection` → `HighlightSection` → `ProgramSection` → `CtaSection` → `EventFooter`. There is a catch-all `NotFound` route.

**Path alias**: `@/` maps to `src/`. Use this for all imports.

**UI components**: `src/components/ui/` contains shadcn/ui primitives — do not manually edit these, use `npx shadcn-ui@latest add <component>` to add new ones. Configuration is in `components.json`.

**Styling**: Dark-only theme. CSS variables defined in `src/index.css`. Custom utilities: `.text-glow`, `.box-glow`, `.border-glow`, `.gradient-navy`. Custom Tailwind colors: `navy-deep`, `navy-mid`, `cyan-glow`, `cyan-light`, `blue-accent`.

**Test setup**: `src/test/setup.ts` provides `@testing-library/jest-dom` matchers and a `matchMedia` polyfill. Tests go in `src/**/*.{test,spec}.{ts,tsx}`.

## TypeScript Config

`strictNullChecks` and `noImplicitAny` are off. `noUnusedLocals` and `noUnusedParameters` are off.

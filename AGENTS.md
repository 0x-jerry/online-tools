# AGENTS.md

## Purpose

A collection of online developer tools — a single-page web app where each page is a standalone utility (JSON validator, markdown preview, LaTeX preview, Mermaid diagram preview, etc.).

## Stack

- **Vite** (build) — `bun dev` / `bun build`
- **Vue 3** + **TypeScript** (UI)
- **vue-router** with unplugin auto-routes (file-based routing from `src/pages/`)
- **UnoCSS** (utility CSS, presetMini + presetIcons)
- **Monaco Editor** (code editing)
- **Bun** (package manager)

## Key Conventions

### Adding a new tool

1. Create `src/pages/{tool}/index.vue` (auto-registered as route `/{tool}`)
2. Optional: `src/pages/{tool}/_defaultSource.ts` for default content (`_` prefix excluded from routes)
3. Add entry to `allTools` array in `src/tools.ts` (name, route, icon from Carbon set)
4. Install any new deps with `bun add {pkg}`

### Code quality

- Run `bun run check` for type-checking (vue-tsc --noEmit)

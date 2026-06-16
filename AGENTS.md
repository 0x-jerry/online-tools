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

## Project Structure

```
src/
  main.ts              # App entry: global CSS, polyfills, mount
  App.vue              # Root layout: sidebar + router-view
  tools.ts             # Tool registry (nav menu items)
  pages/               # File-based routes (auto-registered)
    index.vue          # → /
    {tool}/index.vue   # → /{tool}
  components/
    AppSidebar.vue     # Navigation sidebar
    monaco-editor/     # Monaco wrapper component
      CodeEditor.vue   # Reusable editor (setup prop for custom logic)
      langs/           # Custom language tokenizers (Monarch)
    PreviewPanel.vue   # Reusable pan/zoom preview wrapper
  modules/
    router.ts          # Vue Router setup (hash history)
  composables/         # Shared composables
  styles/              # Global Less styles
```

## Key Conventions

### Adding a new tool

1. Create `src/pages/{tool}/index.vue` (auto-registered as route `/{tool}`)
2. Optional: `src/pages/{tool}/_defaultSource.ts` for default content (`_` prefix excluded from routes)
3. Add entry to `allTools` array in `src/tools.ts` (name, route, icon from Carbon set)
4. Install any new deps with `bun add {pkg}`

### Custom Monaco language

1. Create `src/components/monaco-editor/langs/{name}.lang.ts` with Monarch tokenizer
2. Import and call `register*()` in `useWorker.ts`

### Code quality

- Run `bun run check` for type-checking (vue-tsc --noEmit)

## Dependencies to be aware of

- `monaco-editor` — code editor with built-in language support
- `marked` — markdown parsing (for rendered preview, if needed at runtime)
- `katex` — LaTeX math rendering
- `mermaid` — diagram rendering
- `github-markdown-css` — GitHub-flavored markdown styles
- `@vueuse/core` — Vue composables (useElementSize, watchDebounced, etc.)

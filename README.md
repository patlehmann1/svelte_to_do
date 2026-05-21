# To Do

A simple to-do app built with SvelteKit 5 (Runes). Add, edit, and delete tasks — todos persist in `localStorage` so nothing is lost on refresh.

## Stack

- **SvelteKit 5** with Svelte Runes (`$state`, `$derived`, `$effect`)
- **TypeScript**
- **Plain scoped CSS** — no CSS framework
- [Fraunces](https://fonts.google.com/specimen/Fraunces) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts

## Project structure

```
src/
├── app.html                        # HTML shell (Google Fonts link)
├── app.css                         # Global CSS variables (design tokens) + body reset
├── lib/
│   ├── todos.svelte.ts             # Reactive todo store with localStorage persistence
│   └── components/
│       └── TodoItem.svelte         # Single todo — display/inline-edit/delete
└── routes/
    ├── +layout.svelte              # Imports app.css
    └── +page.svelte                # Main page — add form + todo list
```

## Developing

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Building

```sh
npm run build
npm run preview
```

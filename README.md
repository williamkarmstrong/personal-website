# Personal website

Projects and writing by William Armstrong. Themed as an engineering notebook /
component datasheet.

## Documents

Read these before changing anything. They govern the code.

| File | Role |
| ---- | ---- |
| `CLAUDE.md` | Instructions for Claude Code, and the document contract |
| `spec.md` | **The plan file.** Requirements. Changes before any code does. |
| `design.md` | Visual and interaction language. Tokens, type, components. |
| `me.md` | Biographical source of truth. **Not committed** — local only. |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vercel

The site must stay statically exportable — no middleware, route handlers, ISR,
or server actions. See `spec.md` §3.1.

## Commands

```
npm run dev        # dev server on :3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

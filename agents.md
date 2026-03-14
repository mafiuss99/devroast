# DevRoast - Project Patterns

## UI Components

- Location: `src/components/ui/`
- Use **named exports** only
- Use **tailwind-variants** for component variants
- Use **composition pattern** (Root, Title, Description) instead of props
- Colors from design system in `globals.css` @theme

## Styling

- Tailwind CSS v4 with @theme
- Use CSS variables: `text-accent-green`, `bg-bg-input`, etc.
- Avoid hardcoded colors

## Code Patterns

- Server Components by default
- "use client" only when needed (hooks, interactivity)
- Biome for lint/format

## Run Commands

- `npm run dev` - development
- `npm run build` - production build
- `npx biome check .` - lint check
- `npx biome format --write .` - format

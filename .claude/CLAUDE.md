# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Responsive Typography Generator** built with Angular 20+ and Tailwind CSS. It's a single-page application that provides an interactive tool for creating fluid, responsive typography systems using CSS `clamp()` functions and Tailwind CSS utilities.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Build and watch for changes
npm run watch

# Run tests
npm test

# Format code with Prettier
npx prettier --write .
```

## Architecture

### Core Application Structure

- **Single Component App**: The main application is contained in `src/app/app.ts`
- **Standalone Components**: Uses Angular standalone components (no NgModules)
- **Zoneless**: Configured with `provideZonelessChangeDetection()`
- **Signals**: Uses Angular signals for state management
- **Inline Templates**: Large inline template in the main App component

### Styling System

- **Tailwind CSS**: Primary styling framework with custom fluid typography utilities
- **Fluid Typography**: Custom Tailwind utilities defined in `tailwind.config.js`:
  - `text-fluid-xs` through `text-fluid-6xl`
  - Each uses CSS `clamp()` for responsive scaling
  - Example: `'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)'`

### Configuration Files

- `angular.json`: Configured for inline templates/styles by default (`skipTests: true`)
- `tailwind.config.js`: Custom fluid typography utilities
- `.prettierrc`: Code formatting (100 char width, single quotes, Angular HTML parser)

## TypeScript & Angular Best Practices

- Use strict type checking
- Prefer type inference when type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators (it's the default)
- Use signals for state management
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Use the `inject()` function instead of constructor injection
- Use `providedIn: 'root'` option for singleton services

## Fluid Typography System

This project implements a custom fluid typography system:

### Tailwind Utilities

- Fluid font sizes from `text-fluid-xs` to `text-fluid-6xl`
- Each utility uses `clamp(min, preferred, max)` for responsive scaling
- Viewport-based scaling using `vw` units

### Implementation Pattern

```css
.text-fluid-base {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
}
```

### Key Features

- Smooth scaling across all viewport sizes
- No breakpoint jumps
- Maintains optimal readability
- Integrates seamlessly with Tailwind CSS

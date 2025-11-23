# Quasar - Code Editor & Workplace

## Overview
Quasar is a modern web-based code editor and workplace application built with React, TypeScript, and Vite. It provides a professional development environment with Monaco Editor integration and a clean, responsive interface.

## Tech Stack

### Core Technologies
- **React 19** - UI framework with React Compiler enabled
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing

### Key Features
- **Monaco Editor** - Full-featured code editor (same as VS Code)
- **TailwindCSS 4** - Modern utility-first CSS framework
- **Zustand** - Lightweight state management
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client for API requests

### UI Components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **clsx** - Conditional class names

## Project Structure
```
src/
├── components/     # Reusable UI components (Editor, Sidebar, etc.)
├── pages/         # Route pages (Workplace, Profile, Login)
├── layouts/       # Layout components (MainLayout)
├── store/         # Zustand state management
├── themes/        # Theme configurations
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── types/         # TypeScript type definitions
```

## Main Features

### Workplace
The main workspace includes:
- **Sidebar Navigation** - File/project navigation
- **Monaco Editor** - Full-featured code editing experience
- **Multi-page Support** - Profile and workplace views

### Development Experience
- **React Compiler** - Automatic optimization (note: impacts build performance)
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting with Tailwind plugin
- **Hot Module Replacement** - Fast development feedback

## Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Configuration Files
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules
- `prettier.config.mjs` - Prettier formatting rules

## Notes
- Uses Bun as package manager (see `bun.lock`)
- React Compiler is enabled - may impact build performance
- Configured for modern browsers with ES modules support

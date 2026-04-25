# SceneSplit (Frontend-only)

SceneSplit is a **modern, cinematic** frontend web app for filmmakers and creators.
You paste a scene idea, hit **Generate**, and the UI “directs” the moment into structured film-style outputs.

**Important:** This is **frontend-only**. There are **no backend endpoints** and **no API calls**. The app simulates an AI response using **mock JSON**.

## Run it with local AI (Ollama) - Windows / PowerShell

### 1) Install Ollama

- Download and install: [https://ollama.com/download](https://ollama.com/download)

### 2) Pull a local model

Run once in PowerShell:

```powershell
ollama pull qwen2.5:7b
```

### 3) Create `.env` from `.env.example`

From the project folder:

```powershell
cd "c:\Users\Prajwal\Downloads\Scene Split cursor wala\scenesplit"
copy .env.example .env
npm install
```

`.env` defaults:
- `OLLAMA_BASE_URL=http://127.0.0.1:11434`
- `OLLAMA_MODEL=qwen2.5:7b`

### 4) Start services

Terminal 1 (backend):

```powershell
npm run dev:backend
```

Terminal 2 (frontend):

```powershell
npm run dev
```

Then open:
- `http://localhost:5173/`

### 5) Use the app

1. Paste your script/idea.
2. Click **Break into Scenes**.
3. Backend calls your local Ollama model at `OLLAMA_BASE_URL`.

If you see an error, ensure:
- Ollama app/service is running.
- You pulled the model in `.env` (`ollama list` to verify).

## Build for production

```powershell
npm run build
npm run preview
```

## License & Copyright

**Copyright (c) 2026 Roanak Singh & Prajwal Dudhal**

This project is licensed under the **MIT License**.

In simple words:
- You can use this project for personal, academic, and commercial work.
- You can modify and redistribute the code.
- You must keep the original copyright and license notice.
- The project is provided "as is" without warranty.

See the [LICENSE](./LICENSE) file for full legal terms.

## Where the AI output comes from

Local Ollama response is requested in:
- `server.js` (`POST /api/breakdown` -> `POST /api/generate` on Ollama)

## Project structure (high level)

- `src/App.tsx`: main layout + interaction (input, loading state, output sections)
- `src/components/*`: reusable UI pieces (cards, copy buttons, loader, shot cards, tabs)
- `src/index.css`: Tailwind + cinematic dark theme styles

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

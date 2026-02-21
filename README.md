# jem-trans

A desktop LLM-powered translator application built with Tauri v2, React 19, and TypeScript.

## Features

- **LLM Translation** - Leverages large language models for high-quality translations
- **Text-to-Speech (TTS)** - Built-in speech synthesis using Microsoft Edge TTS voices
- **Language Detection** - Automatic language detection using whatlang
- **Custom API Support** - Configure your own OpenAI-compatible API endpoint
- **Modern UI** - Clean interface built with Radix UI, Tailwind CSS v4, and shadcn/ui components
- **Cross-Platform** - Runs on Linux, Windows, and macOS via Tauri

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible UI primitives
- **shadcn/ui** (New York style) - Component library
- **Lucide Icons** - Icon set
- **TanStack Query** - Data fetching and state management
- **Zod** - Runtime type validation

### Backend (Rust)
- **Tauri v2** - Desktop application framework
- **async-openai** - OpenAI API client for LLM integration
- **msedge-tts** - Microsoft Edge TTS for speech synthesis
- **whatlang** - Language detection
- **rodio** - Audio playback
- **tauri-plugin-store** - Persistent storage
- **tauri-specta** - Type-safe TypeScript bindings generation

## Project Structure

```
jem-trans/
├── src/                    # Frontend React code
│   ├── app/               # App configuration, contexts, hooks, styles
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   │   ├── TranslatorPage # Main translation interface
│   │   └── SettingsPage   # API configuration and settings
│   ├── lib/               # Utility functions
│   └── bindings.ts        # Auto-generated Tauri-Specta bindings
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── commands/      # Tauri command handlers
│   │   │   ├── llm.rs     # LLM API commands
│   │   │   ├── tts.rs     # Text-to-speech commands
│   │   │   └── lang.rs    # Language detection commands
│   │   ├── logic/         # Business logic
│   │   ├── models.rs      # Data models
│   │   └── state.rs       # Application state management
│   └── tauri.conf.json    # Tauri configuration
└── package.json           # Node.js dependencies
```

## Prerequisites

- **Node.js** (v18 or later)
- **Rust** (latest stable)
- **GTK3** (Linux only) - For Tauri GTK backend

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jem-trans
```

2. Install frontend dependencies:
```bash
npm install
```

3. Build and run in development mode:
```bash
npm run tauri dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npm run tauri` | Run Tauri CLI (append `dev` or `build`) |

## Configuration

### LLM API Setup

The application supports any OpenAI-compatible API. Configure in the Settings page:

1. **API Key** - Your API authentication key
2. **API URL** - Base URL for the API endpoint (e.g., `https://api.openai.com/v1`)
3. **Model** - Select from available models
4. **Temperature** - Adjust response creativity (0.0 - 2.0)

### Text-to-Speech

The app includes Microsoft Edge TTS voices. Available voices are loaded automatically and can be selected in the translator interface.

## Development Notes

- **WebKit DMABUF** - Disabled by default on Linux (`WEBKIT_DISABLE_DMABUF_RENDERER=1`) to prevent rendering issues
- **Fixed Port** - Vite dev server runs on port 1420 (required by Tauri)
- **Type Safety** - TypeScript bindings are auto-generated from Rust code using tauri-specta

## Architecture

### State Management
- **React Context** - UI state (page navigation, settings)
- **TanStack Query** - Server state and caching
- **Tauri State** - Rust backend state (API client, audio mixer, voices)

### Key Components
- **AppBar** - Top navigation bar
- **TranslatorPage** - Main translation interface with input/output and TTS controls
- **SettingsPage** - API configuration and user preferences

## Building for Production

```bash
npm run tauri build
```

This creates distributable packages in `src-tauri/target/release/bundle/`.

## License

Private project

## Author

Daniil

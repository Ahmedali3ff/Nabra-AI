# Nabra AI — نَبْرة

> **Type it. Speak it. Communicate.**  
> صوتك، بلغتك.

Nabra AI is an accessible voice communication platform built on the
[VoiceForge](https://github.com/itzzavdhesh/VoiceForge) open-source foundation
by [itzzavdhesh](https://github.com/itzzavdhesh), licensed under the MIT License.

---

## Why This Exists

Nabra AI extends VoiceForge with three original features — Smart Phrase Library,
Context Suggestions, and Conversation History — designed to make daily typed
communication faster and more accessible, especially for users who rely on TTS
for real-time interaction in meetings, classrooms, and daily life.

The Arabic name **نَبْرة** (Nabra) means *tone*, *intonation*, or *voice inflection* —
a fitting identity for an expressive voice communication tool.

---

## Features

### Core Features (from VoiceForge)

These capabilities come directly from the VoiceForge foundation — credit goes entirely to itzzavdhesh:

- **Voice Recording** — short reference recording via browser microphone or file upload
- **Voice Cloning** — create a local voice profile from a recording
- **Multilingual TTS** — speech generation via Chatterbox Multilingual TTS (Gradio / Hugging Face)
- **Voice Profile Management** — save and switch between cloned voice profiles (IndexedDB)
- **Emotion Presets** — neutral, excited, serious, whispering, cheerful
- **ONNX Lip-Sync** — synchronized facial animation output via ONNX Runtime Web
- **Virtual Camera Workflow** — stream lip-synced canvas output to OBS / virtual camera
- **Mock / Offline Mode** — full UI flow without live backend or Hugging Face connection
- **Dark / Light Mode** — system-aware theme switching

### Original Development (by Ahmed Ali Elwekil)

These features were designed and built by Ahmed Ali Elwekil on top of the VoiceForge foundation:

- **Nabra AI Branding** — نَبْرة identity, deep teal + amber design system, redesigned landing page
- **Smart Phrase Library** — save, search, categorize, and reuse frequently used phrases; "Use Phrase" inserts text into the TTS composer; localStorage persistence
- **Context Suggestions** — rule-based (no ML/AI) phrase suggestions for 5 contexts (Meeting, Daily Conversation, Classroom, Emergency, Presentation); labeled transparently; works fully offline
- **Conversation History** — last 50 speech events with audio replay, "Use Again" reinsert, localStorage persistence
- **Responsible Cloning Notice** — consent-gating modal for voice cloning; session-scoped
- **Server Env Validation** — startup check that required env vars are set in production
- **Deployment Configuration** — Vercel SPA routing, Render/Railway backend docs

---

## Architecture

```
nabra-ai/                         (repo root — originally voxena/)
├── client/                       # Vite + React 18 SPA
│   └── src/
│       ├── components/
│       │   ├── ui/               # Nabra AI design system (Button, Card, Badge…)
│       │   ├── landing/          # LandingPage (9 sections)
│       │   ├── phrase-library/   # Smart Phrase Library
│       │   ├── context-suggestions/ # Context Suggestions
│       │   ├── history/          # Conversation History
│       │   └── [VoiceForge core — unmodified]
│       ├── hooks/                # usePhraseLibrary, useConversationHistory, useInView
│       ├── data/                 # contextSuggestions.js (static, no ML)
│       └── utils/                # phraseStorage.js, historyStorage.js
├── server/                       # Express + SQLite (VoiceForge core — no logic changes)
│   └── validateEnv.js            # Nabra AI: startup env var validation
├── vercel.json                   # SPA rewrite config
└── .env.example                  # Complete env var documentation
```

---

## Tech Stack

| Layer       | Technology                                               |
|-------------|----------------------------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS v3                          |
| Voice / ML  | ONNX Runtime Web, MediaPipe, Chatterbox TTS via Gradio   |
| Backend     | Node.js, Express, SQLite, JWT, Helmet                    |
| Storage     | IndexedDB (voice/audio), localStorage (phrases/history)  |
| Testing     | Vitest, @testing-library/react                           |
| Deployment  | Vercel (frontend), Render / Railway (backend)            |

---

## Setup

### Prerequisites

- Node.js ≥ 20.19.0
- npm ≥ 9

### Local Development

```bash
# 1. Clone and enter the repo
git clone https://github.com/YOUR_USERNAME/nabra-ai
cd nabra-ai

# 2. Install all workspace dependencies
npm install

# 3. Copy and configure environment variables
cp .env.example .env
# Edit .env — set VITE_MOCK_MODE=true to run without a live TTS backend

# 4. Start both frontend and backend in watch mode
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

---

## Environment Variables

See `.env.example` for the complete list with descriptions.

| Variable            | Required in prod | Description                                     |
|---------------------|------------------|-------------------------------------------------|
| `PORT`              | No               | Backend port (default: 3001)                    |
| `NODE_ENV`          | Yes              | `production` or `development`                   |
| `CLIENT_URL`        | Yes              | Frontend origin for CORS                        |
| `JWT_SECRET`        | Yes              | Secret for JWT signing (min 32 chars)           |
| `STREAM_SECRET`     | Yes              | Prevents token invalidation on restart          |
| `GRADIO_SPACE`      | No               | Chatterbox TTS Gradio space override            |
| `MOCK_CHATTERBOX`   | No               | `true` to skip all TTS network calls            |
| `VITE_API_BASE_URL` | No (dev)         | Backend public URL for production frontend      |
| `VITE_MOCK_MODE`    | No               | `true` to enable client-side mock mode          |

---

## Testing

```bash
# From the repo root
npm run test --workspace client

# Or directly from client/
cd client
npx vitest run --config vitest.config.js
```

Test files for Nabra AI original features:
- `client/src/components/phrase-library/__tests__/PhraseLibrary.test.js`
- `client/src/components/context-suggestions/__tests__/ContextSuggestions.test.js`
- `client/src/components/history/__tests__/ConversationHistory.test.js`

---

## Deployment

### Frontend — Vercel

1. Import the repository into [Vercel](https://vercel.com)
2. `vercel.json` is already configured (SPA rewrite + Vite build)
3. Set environment variables in the Vercel dashboard:
   - `VITE_API_BASE_URL` → your backend URL
   - `VITE_MOCK_MODE=false`

### Backend — Render or Railway

**Start command:** `node server/index.js`  
**Build command:** `npm install`  
Set all variables from `.env.example` in the platform dashboard.

---

## Credits

**Original foundation:**
> **VoiceForge** by [itzzavdhesh](https://github.com/itzzavdhesh)  
> Repository: https://github.com/itzzavdhesh/VoiceForge  
> License: MIT

The voice recording, cloning, Chatterbox TTS, ONNX lip-sync, virtual camera
workflow, and core Express backend are from VoiceForge. Full attribution is
maintained in the `LICENSE` file.

**Additional development:**  
Ahmed Ali Elwekil added the three original features, the Nabra AI برanding and
landing page, deployment configuration, and test coverage described above.

---

## License

MIT License — see `LICENSE` for the original VoiceForge copyright and license text.  
Additional work in this repository is released under the same MIT License.

---

## Portfolio Description

> Nabra AI (نَبْرة) is a portfolio project built on the [VoiceForge](https://github.com/itzzavdhesh/VoiceForge) open-source foundation (MIT, by itzzavdhesh). The voice cloning, multilingual TTS, and lip-sync infrastructure come from that foundation. Ahmed Ali Elwekil's original contributions: Smart Phrase Library (localStorage CRUD), Context Suggestions (rule-based, offline-capable, 5 contexts), Conversation History (50-entry FIFO, replay, reuse), Nabra AI brand identity and landing page, Responsible Cloning Notice, and Vitest test suites. Stack: React 18, Vite, Tailwind CSS v3, Node.js, Express, Vitest.

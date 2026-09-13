import React from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";

const AHMED_TECH = [
  { name: "Python",        color: "primary" },
  { name: "Machine Learning", color: "primary" },
  { name: "Scikit-learn",  color: "primary" },
  { name: "AI / LLMs",     color: "accent"  },
  { name: "OCR",           color: "default" },
  { name: "JavaScript",    color: "success" },
  { name: "TypeScript",    color: "success" },
  { name: "React",         color: "success" },
  { name: "Node.js",       color: "success" },
  { name: "Flutter",       color: "default" },
  { name: "Dart",          color: "default" },
  { name: "Java",          color: "warning" },
  { name: "Kotlin",        color: "warning" },
];

const AHMED_SOCIAL = [
  {
    name: "GitHub",
    url: "https://github.com/Ahmedali3ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    bg: "bg-neutral-800 dark:bg-neutral-700",
    hover: "hover:bg-neutral-900 dark:hover:bg-neutral-600 hover:scale-110",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ahmed-ali60928328/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bg: "bg-blue-600 dark:bg-blue-500",
    hover: "hover:bg-blue-700 dark:hover:bg-blue-400 hover:scale-110",
  },
];

const HOW_STEPS = [
  {
    number: "01",
    title: "Record Your Voice",
    description:
      "Record a short reference clip. Nabra AI creates a voice profile stored locally in your browser.",
  },
  {
    number: "02",
    title: "Type What You Want to Say",
    description:
      "Type any phrase in the Compose view. Nabra AI converts it to speech using your cloned voice.",
  },
  {
    number: "03",
    title: "Communicate Naturally",
    description:
      "Join calls with lip-synced output or use the virtual camera to stream your voice to video call software.",
  },
];

const TECH_STACK = [
  { layer: "Frontend",    tech: "React 18, Vite, Tailwind CSS v3" },
  { layer: "Voice / ML", tech: "ONNX Runtime Web, MediaPipe, Chatterbox TTS (Gradio)" },
  { layer: "Backend",     tech: "Node.js, Express, SQLite, JWT, Helmet" },
  { layer: "Storage",     tech: "IndexedDB (voice/audio), localStorage (phrases/history)" },
  { layer: "Testing",     tech: "Vitest, @testing-library/react" },
  { layer: "Deployment",  tech: "Vercel (frontend), Render / Railway (backend)" },
];

export default function About({ onNavigate }) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-14">

        {/* ── Header ──────────────────────────────────────────────── */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-3">About Nabra AI <span lang="ar" dir="rtl" className="text-primary-600">نَبْرة</span></h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            An accessible voice communication platform. Turn typed text into
            natural speech with voice cloning, multilingual TTS, and
            synchronised visual output.
          </p>
        </section>

        {/* ── Developer bio ─────────────────────────────────────── */}
        <Card variant="highlight" className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
            <div className="mb-4 flex-shrink-0 sm:mb-0">
              <div className="h-16 w-16 rounded-2xl bg-primary-600 flex items-center justify-center text-2xl font-bold text-white select-none">
                A
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-0.5">
                  Developer — Original Features &amp; Branding
                </p>
                <h2 className="text-2xl font-bold">Ahmed Ali Elwekil</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  AI Engineer &amp; Full Stack Developer · Egypt
                </p>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Ahmed Ali Elwekil is an AI Engineer and Full Stack Developer
                from Egypt with a focus on machine learning, artificial
                intelligence, and building AI-powered software products. He
                works across the full stack — from ML pipelines and backend
                services to cross-platform mobile applications.
              </p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                  Technology Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {AHMED_TECH.map((t) => (
                    <Badge key={t.name} variant={t.color}>{t.name}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4 text-center">
                  Contact Me
                </p>
                <div className="flex items-center justify-center gap-6">
                  {AHMED_SOCIAL.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-14 h-14 rounded-2xl text-white transition-all duration-200 ${social.bg} ${social.hover} shadow-md hover:shadow-xl`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {HOW_STEPS.map((step) => (
              <Card key={step.number} className="p-5">
                <span className="text-3xl font-extrabold text-primary-100 dark:text-primary-950 select-none">
                  {step.number}
                </span>
                <h3 className="mt-2 text-base font-semibold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-sm">
              <tbody>
                {TECH_STACK.map((row, i) => (
                  <tr
                    key={row.layer}
                    className={i % 2 === 0 ? "bg-white dark:bg-neutral-900" : "bg-neutral-50 dark:bg-neutral-950"}
                  >
                    <td className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                      {row.layer}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                      {row.tech}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

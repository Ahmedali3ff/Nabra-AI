import React from "react";
import { useInView } from "../../hooks/useInView.js";
import {
  Volume2,
  BookOpen,
  Zap,
  History,
  Accessibility,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  MessageSquare,
  Mic2,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const AHMED_TECH = [
  "Python",
  "Machine Learning",
  "AI / LLMs",
  "JavaScript",
  "React",
  "Node.js",
  "Flutter",
  "Java",
  "Kotlin",
];

// ─── Animation wrapper ────────────────────────────────────────────────────────
function AnimatedSection({ children, className = "", delay = "" }) {
  const [ref, inView] = useInView(0.12);
  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        delay,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

// ─── 2. Hero ──────────────────────────────────────────────────────────────────
function HeroSection({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-neutral-950 dark:to-neutral-900 py-20 sm:py-28 px-4 text-center">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" aria-hidden="true" />
          Accessible Voice Communication
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
          Type it.{" "}
          <span className="text-primary-600 dark:text-primary-400">Speak it.</span>
          <br />
          Communicate.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-xl font-semibold text-primary-700 dark:text-primary-300" lang="ar" dir="rtl">
          نَبْرة AI — صوتك، بلغتك
        </p>

        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          Nabra AI gives you a voice — precise, expressive, and accessible.
          Built for daily conversation, meetings, classrooms, and beyond.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => onNavigate?.("onboarding")}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-primary-600 px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          >
            Open App
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-neutral-300 bg-white px-8 py-3 text-base font-semibold text-neutral-700 transition hover:border-primary-300 hover:text-primary-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
          >
            See how it works
            <ChevronDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── 3. How It Works ─────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    number: "01",
    icon: Mic2,
    title: "Record Your Voice",
    description:
      "Record a short reference clip. Voxena creates a voice profile stored locally in your browser.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Type What You Want to Say",
    description:
      "Type any phrase in the Compose view. Voxena converts it to natural speech using your cloned voice.",
  },
  {
    number: "03",
    icon: Users,
    title: "Communicate Naturally",
    description:
      "Join calls and conversations with lip-synced output or stream your voice directly via the virtual camera.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400">
            Three steps from setup to natural communication.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-3">
          {HOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimatedSection key={step.number} delay={`delay-[${i * 100}ms]`}>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 h-full dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-4xl font-extrabold text-primary-100 dark:text-primary-950 select-none">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white flex-shrink-0">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Voice Cloning ─────────────────────────────────────────────────────────
function VoiceCloningSection({ onNavigate }) {
  const features = [
    "Record a short voice sample",
    "Create a persistent voice profile",
    "Switch between multiple voice profiles",
    "Your voice data stays in your browser",
    "Responsible cloning — consent required",
  ];

  return (
    <section className="py-20 px-4 bg-primary-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 mb-4">
              <Mic2 size={13} aria-hidden="true" />
              Voice Cloning
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
              Your voice, preserved digitally
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Nabra AI clones your voice from a short recording and stores the
              profile locally in your browser. No cloud upload — your voice
              data never leaves your device.
            </p>
            <ul className="mt-6 space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/40">
              <div className="flex items-start gap-2">
                <Shield size={15} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Responsible use:</strong> Only clone voices you have
                  explicit permission to use. Voxena requires consent
                  acknowledgment before cloning.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl border border-primary-200 bg-white p-8 shadow-sm dark:border-primary-800 dark:bg-neutral-900">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 rounded-xl bg-primary-50 p-4 dark:bg-primary-950/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
                    <Mic2 size={18} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">Voice Profile</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Stored locally · Ready</p>
                  </div>
                  <span className="ml-auto h-2 w-2 rounded-full bg-green-500" aria-label="Active" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  {["Record", "Clone", "Save", "Use"].map((step) => (
                    <div key={step} className="rounded-lg border border-neutral-200 bg-neutral-50 py-3 dark:border-neutral-800 dark:bg-neutral-950">
                      <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── 5. Speech Generation ──────────────────────────────────────────────────────
function SpeechGenSection() {
  const langs = ["English", "Arabic", "French", "Spanish", "German", "Japanese", "Hindi", "Portuguese"];

  return (
    <section className="py-20 px-4 bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Type to speak</p>
                <Volume2 size={16} className="text-primary-600" aria-hidden="true" />
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 min-h-[80px]">
                "Good morning, I'd like to discuss the agenda for today."
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {langs.map((l) => (
                  <span key={l} className="rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 text-xs text-primary-700 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-300">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-light/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-dark dark:bg-amber-900/40 dark:text-amber-300 mb-4">
              <Volume2 size={13} aria-hidden="true" />
              Multilingual TTS
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
              Natural speech in any language
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Powered by Chatterbox multilingual TTS, Voxena generates natural
              speech from typed text across multiple languages. Your voice
              profile is applied to each generation.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Multilingual synthesis via Chatterbox TTS",
                "Emotion presets — neutral, excited, calm, and more",
                "Offline mock mode for development and low-connectivity use",
                "Audio playback with download support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 size={16} className="text-accent-dark flex-shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── 6. Original Features ─────────────────────────────────────────────────────
const ORIGINAL_FEATURES = [
  {
    icon: BookOpen,
    title: "Smart Phrase Library",
    description:
      "Save, search, and organize frequently used phrases by category. Click 'Use Phrase' to instantly load text into the speech input.",
    badge: "Original",
  },
  {
    icon: Zap,
    title: "Context Suggestions",
    description:
      "Select a context — Meeting, Classroom, Emergency, and more — to see relevant pre-written phrase suggestions. Rule-based, instant, and works offline.",
    badge: "Original",
  },
  {
    icon: History,
    title: "Conversation History",
    description:
      "Review your recent speech events, replay past audio, or click 'Use Again' to reload text into the composer without retyping.",
    badge: "Original",
  },
];

function OriginalFeaturesSection() {
  return (
    <section className="py-20 px-4 bg-primary-50/50 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-light/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-dark dark:bg-amber-900/40 dark:text-amber-300 mb-4">
            Original Development
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
            Built for real communication needs
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            These features were designed and developed by Ahmed Ali Elwekil
            as part of Nabra AI.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-3">
          {ORIGINAL_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={`delay-[${i * 80}ms]`}>
                <div className="rounded-2xl border border-primary-200 bg-white p-6 h-full shadow-sm hover:shadow-md transition-shadow dark:border-primary-800 dark:bg-neutral-900">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-accent-light/40 px-2.5 py-0.5 text-xs font-semibold text-accent-dark dark:bg-amber-900/30 dark:text-amber-300">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 7. Accessibility ─────────────────────────────────────────────────────────
const A11Y_POINTS = [
  "WCAG AA colour contrast across all components",
  "Visible focus rings on every interactive element",
  "Screen reader live-region announcements for speech events",
  "Full keyboard navigation — no mouse required",
  "Respects prefers-reduced-motion for all animations",
  "Accessible labels on all icon-only buttons",
  "Emergency context suggestions clearly prioritised",
];

function AccessibilitySection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 dark:border-primary-800 dark:bg-primary-950/20 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:gap-10">
              <div className="mb-6 flex-shrink-0 md:mb-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white">
                  <Accessibility size={26} aria-hidden="true" />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 mb-3">
                  Accessibility First
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
                  Designed for everyone
                </h2>
                <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Voxena is built with accessibility as a core principle, not an
                  afterthought. The interface is designed to work reliably with
                  assistive technologies and diverse input methods.
                </p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {A11Y_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 size={15} className="text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 8. About Ahmed ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 md:p-10">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:gap-6">
              <div className="mb-4 flex-shrink-0 sm:mb-0">
                <div className="h-16 w-16 rounded-2xl bg-primary-600 flex items-center justify-center text-2xl font-bold text-white select-none">
                  A
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-1">
                  Developer
                </p>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Ahmed Ali Elwekil
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  AI Engineer &amp; Full Stack Developer · Egypt
                </p>
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Ahmed Ali Elwekil is an AI Engineer and Full Stack Developer from
              Egypt with a focus on machine learning, artificial intelligence,
              and building AI-powered software products. He works across the
              full development stack — from ML pipelines and backend services to
              cross-platform mobile applications.
            </p>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {AHMED_TECH.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-800 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4 text-center">
                Contact Me
              </p>
              <div className="flex items-center justify-center gap-5">
                <a
                  href="https://github.com/Ahmedali3ff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-800 dark:bg-neutral-700 text-white hover:bg-neutral-900 dark:hover:bg-neutral-600 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-xl"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmed-ali60928328/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-xl"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 9. CTA ───────────────────────────────────────────────────────────────────
function CTASection({ onNavigate }) {
  return (
    <section className="py-20 px-4 bg-primary-600 dark:bg-primary-800">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to communicate naturally?
          </h2>
          <p className="mt-4 text-primary-100 text-lg leading-relaxed">
            Start with voice recording in the Onboarding tab, then use the
            Compose or Call view to generate speech with Nabra AI.
          </p>
          <button
            onClick={() => onNavigate?.("onboarding")}
            className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-bold text-primary-700 shadow-lg hover:bg-primary-50 transition hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 focus-visible:outline-none"
          >
            Get Started
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 10. Landing Footer ───────────────────────────────────────────────────────
function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-900 py-10 px-4 text-center dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl space-y-4">
        <p className="text-sm font-semibold text-white">
          Nabra AI &nbsp;<span lang="ar" dir="rtl">نَبْرة</span>
        </p>
        
        {/* Social Links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/Ahmedali3ff"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-all duration-200 hover:scale-110"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-ali60928328/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all duration-200 hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        
        <p className="text-xs text-neutral-600">© {year} Nabra AI — MIT License</p>
      </div>
    </footer>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
      {/* No inner Navbar — App.jsx already renders the global header */}
      <HeroSection onNavigate={onNavigate} />
      <HowItWorksSection />
      <VoiceCloningSection onNavigate={onNavigate} />
      <SpeechGenSection />
      <OriginalFeaturesSection />
      <AccessibilitySection />
      <AboutSection />
      <CTASection onNavigate={onNavigate} />
      <LandingFooter />
    </div>
  );
}
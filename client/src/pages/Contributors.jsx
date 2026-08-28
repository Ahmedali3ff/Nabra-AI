import React from "react";
import { Phone, Mail, MessageCircle, Globe, ExternalLink } from "lucide-react";

const REPO = "itzzavdheshh/VoiceForge";

export default function Contributors() {
  const [contributors, setContributors] = React.useState([]);
  const [status, setStatus] = React.useState("loading");
  const [retryCount, setRetryCount] = React.useState(0);

  React.useEffect(() => {
    const controller = new AbortController();
    async function fetchContributors() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contributors?per_page=100`,
          { signal: controller.signal },
        );
        if (res.status === 403) {
          throw new Error("rate_limited");
        }
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (controller.signal.aborted) return;
        setContributors(data.filter((c) => c.type !== "Bot"));
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setStatus(err.message === "rate_limited" ? "rate_limited" : "error");
      }
    }
    fetchContributors();
    return () => controller.abort();
  }, [retryCount]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="rounded-xl bg-black p-6 text-white shadow-soft dark:border dark:border-border dark:bg-surface dark:shadow-soft-dk">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-mint">
          Open Source Community
        </p>
        <h2 className="mt-1 text-2xl font-bold">
          Project Creator & Contributors
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          The people who build and maintain VoiceForge on GitHub.
        </p>
      </section>

      {/* Creator / Lead Author Spotlight */}
      <section className="rounded-xl border border-moss/30 bg-white p-6 shadow-soft dark:border-glow/30 dark:bg-surface dark:shadow-soft-dk">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/owner.jpg"
            alt="Avdhesh Kumar Dadhich"
            className="h-24 w-24 rounded-full object-cover ring-4 ring-moss/30 dark:ring-glow/40 shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://github.com/itzzavdheshh.png";
            }}
          />
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-ink dark:text-neutral-100">
                Avdhesh Kumar Dadhich
              </h3>
              <span className="rounded-full bg-moss/20 px-3 py-0.5 text-xs font-bold text-moss dark:bg-glow/20 dark:text-glow">
                Project Founder & Lead Author
              </span>
            </div>

            <p className="text-sm text-ink/70 dark:text-muted">
              Created VoiceForge to enable deaf and speech-impaired individuals
              to communicate fluently on video calls using AI voice cloning &
              virtual camera integration.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <a
                href="https://wa.me/917690863039?text=Hi%20Avdhesh%2C%20I%20came%20from%20VoiceForge!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 transition"
              >
                <MessageCircle size={13} />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+917690863039"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 transition"
              >
                <Phone size={13} />
                <span>Call 7690863039</span>
              </a>

              <a
                href="mailto:aavdhesh.dadhich@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600 hover:bg-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 transition"
              >
                <Mail size={13} />
                <span>Email</span>
              </a>

              <a
                href="https://voice-forge-client.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-600 hover:bg-sky-500/20 dark:bg-sky-500/20 dark:text-sky-400 transition"
              >
                <Globe size={13} />
                <span>Live App</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              <a
                href="https://github.com/itzzavdheshh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-moss dark:hover:text-glow"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/aavdhesh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-moss dark:hover:text-glow"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://x.com/Itzzavdheshh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-moss dark:hover:text-glow"
              >
                X (Twitter)
              </a>
              <span>•</span>
              <a
                href="https://www.instagram.com/itzzavdheshh?igsi=MTFkNTM5OGljOHV5aQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-moss dark:hover:text-glow"
              >
                Instagram
              </a>
              <span>•</span>
              <a
                href="https://discord.com/users/1385290408698839223"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-moss dark:hover:text-glow"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Contributors List */}
      <div>
        <h3 className="text-lg font-bold mb-4">All GitHub Contributors</h3>

        {status === "loading" && (
          <p role="status" className="text-center text-sm text-neutral-500">
            Loading contributors…
          </p>
        )}

        {status === "rate_limited" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p
              role="alert"
              className="text-sm text-yellow-600 dark:text-yellow-400"
            >
              GitHub API rate limit reached. Please wait a moment and try again.
            </p>
            <button
              onClick={() => setRetryCount((c) => c + 1)}
              className="rounded-md border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-moss dark:border-border dark:bg-black dark:text-neutral-200"
            >
              Retry
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p role="alert" className="text-sm text-red-500">
              Failed to load contributors. Please try again later.
            </p>
            <button
              onClick={() => setRetryCount((c) => c + 1)}
              className="rounded-md border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-moss dark:border-border dark:bg-black dark:text-neutral-200"
            >
              Retry
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {contributors.map((contributor) => (
              <a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-lg border border-ink/10 bg-white p-4 text-center transition hover:border-moss hover:shadow-md dark:border-border dark:bg-surface dark:hover:border-glow"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-ink dark:text-neutral-100">
                  {contributor.login}
                </span>
                <span className="text-xs text-neutral-500">
                  {contributor.contributions} commit
                  {contributor.contributions !== 1 ? "s" : ""}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

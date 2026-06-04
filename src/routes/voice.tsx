import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Mic } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/voice")({
  head: () => ({ meta: [{ title: "Voice Assistant · IHINGA AI" }] }),
  component: VoicePage,
});

function VoicePage() {
  const [listening, setListening] = useState(false);
  return (
    <PageShell title="Voice Assistant" subtitle="Speak in Kinyarwanda, English or French — IHINGA understands.">
      <div className="rounded-3xl bg-gradient-forest text-white shadow-luxe p-10 lg:p-16 relative overflow-hidden">
        <div className="absolute -top-20 -left-10 w-[400px] h-[400px] rounded-full bg-amber-glow/30 blur-3xl animate-float" />
        <div className="absolute -bottom-20 -right-10 w-[400px] h-[400px] rounded-full bg-forest/40 blur-3xl animate-float [animation-delay:1.5s]" />
        <div className="relative flex flex-col items-center text-center">
          <button
            onClick={() => setListening((l) => !l)}
            className={`relative grid place-items-center w-44 h-44 rounded-full bg-gradient-sunrise text-sidebar transition-all duration-500 ${
              listening ? "shadow-glow scale-110 animate-glow-pulse" : "shadow-luxe hover:scale-105"
            }`}
          >
            <Mic className="w-16 h-16" strokeWidth={1.8} />
            {listening && (
              <>
                <span className="absolute inset-0 rounded-full border-2 border-amber-glow animate-ping" />
                <span className="absolute -inset-4 rounded-full border border-amber-glow/40 animate-ping [animation-delay:0.4s]" />
              </>
            )}
          </button>

          <div className="mt-10 flex items-end gap-1.5 h-16">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="w-1.5 bg-amber-glow/70 rounded-full transition-all"
                style={{
                  height: listening ? `${20 + Math.sin(i * 0.7 + Date.now() / 200) * 30 + 30}px` : "8px",
                  animation: listening ? `float ${0.6 + (i % 5) * 0.1}s ease-in-out infinite alternate` : "none",
                }} />
            ))}
          </div>

          <p className="mt-8 font-display text-2xl text-balance max-w-xl">
            {listening ? '"Mbwira uko ubuhinzi bwanjye buhagaze uyu munsi…"' : "Tap to start listening"}
          </p>
          <p className="mt-2 text-white/70 text-sm">
            {listening ? "Translating: How is my farming doing today?" : "Hold the mic to speak in any language."}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
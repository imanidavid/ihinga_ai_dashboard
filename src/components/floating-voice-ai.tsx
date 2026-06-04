import { useEffect, useRef, useState } from "react";
import { Mic, X, Sparkles, Volume2 } from "lucide-react";

type Phase = "idle" | "listening" | "processing" | "speaking";

const RW_PROMPTS = [
  { user: "Mbwira uko ubuhinzi bwanjye buhagaze uyu munsi.", ai: "Imyaka yawe y'ibigori iri mu buzima bwiza — 92% bya soil moisture. Ntugomba kuhira ejo." },
  { user: "How is the rainfall forecast for Musanze this week?", ai: "Expecting 38mm across three rain events — Wednesday and Saturday peak. Ideal for bean germination." },
  { user: "Igiciro cy'ikawa kiri hehe ku isoko?", ai: "Coffee is trading at 4,250 RWF/kg in Huye — up 6% this week. A good window to negotiate cooperative sales." },
];

export function FloatingVoiceAI() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const promptIdx = useRef(0);

  useEffect(() => {
    if (!open) { setPhase("idle"); setTranscript(""); setResponse(""); }
  }, [open]);

  const startListening = () => {
    const sample = RW_PROMPTS[promptIdx.current % RW_PROMPTS.length];
    promptIdx.current += 1;
    setTranscript(""); setResponse("");
    setPhase("listening");
    // simulate streaming transcript
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTranscript(sample.user.slice(0, i * 2));
      if (i * 2 >= sample.user.length) {
        clearInterval(t);
        setPhase("processing");
        setTimeout(() => {
          setPhase("speaking");
          let j = 0;
          const r = setInterval(() => {
            j += 1;
            setResponse(sample.ai.slice(0, j * 2));
            if (j * 2 >= sample.ai.length) {
              clearInterval(r);
              setTimeout(() => setPhase("idle"), 800);
            }
          }, 35);
        }, 1100);
      }
    }, 45);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open voice assistant"
        className="fixed bottom-6 right-6 z-40 group"
      >
        <span className="absolute inset-0 rounded-full bg-amber-glow/30 blur-xl animate-glow-pulse" />
        <span className="relative grid place-items-center w-16 h-16 rounded-full bg-gradient-sunrise text-sidebar shadow-luxe transition-transform group-hover:scale-110">
          <Mic className="w-6 h-6" strokeWidth={2.2} />
          <span className="absolute inset-0 rounded-full border-2 border-amber-glow/50 animate-ping opacity-60" />
        </span>
        <span className="absolute -top-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-forest text-[10px] text-white border-2 border-background">
          <Sparkles className="w-2.5 h-2.5" />
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 animate-fade-in">
          <div
            className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full sm:w-[420px] glass-dark rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-luxe overflow-hidden">
            {/* Atmospheric glow */}
            <div className="absolute -top-20 -right-10 w-60 h-60 rounded-full bg-amber-glow/20 blur-3xl animate-float pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-forest/30 blur-3xl animate-glow-pulse pointer-events-none" />

            <div className="relative p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-amber-glow/90">
                    <Sparkles className="w-3 h-3" /> IHINGA Voice AI
                  </div>
                  <h3 className="mt-1 font-display text-xl text-sidebar-foreground">
                    {phase === "idle" && "Tap to speak"}
                    {phase === "listening" && "Listening…"}
                    {phase === "processing" && "Thinking…"}
                    {phase === "speaking" && "IHINGA is responding"}
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid place-items-center w-9 h-9 rounded-xl hover:bg-white/10 text-sidebar-foreground/70 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mic + waveform */}
              <div className="mt-7 flex flex-col items-center">
                <button
                  onClick={() => phase === "idle" && startListening()}
                  disabled={phase !== "idle"}
                  className={`relative grid place-items-center w-32 h-32 rounded-full bg-gradient-sunrise text-sidebar shadow-luxe transition-all ${
                    phase === "listening" ? "scale-110 animate-glow-pulse" :
                    phase === "speaking" ? "scale-105" : "hover:scale-105"
                  }`}
                >
                  {phase === "speaking" ? <Volume2 className="w-12 h-12" /> : <Mic className="w-12 h-12" strokeWidth={1.8} />}
                  {phase === "listening" && (
                    <>
                      <span className="absolute inset-0 rounded-full border-2 border-amber-glow animate-ping" />
                      <span className="absolute -inset-3 rounded-full border border-amber-glow/40 animate-ping [animation-delay:0.4s]" />
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-end gap-1 h-10">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-amber-glow/70 transition-all duration-150"
                      style={{
                        height: phase === "listening" || phase === "speaking"
                          ? `${10 + Math.abs(Math.sin((i + Date.now() / 200) * 0.6)) * 28}px`
                          : "4px",
                        animation:
                          phase === "listening" || phase === "speaking"
                            ? `float ${0.5 + (i % 5) * 0.1}s ease-in-out infinite alternate`
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Transcripts */}
              <div className="mt-6 space-y-3 min-h-[100px]">
                {transcript && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 animate-fade-in">
                    <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50">You</div>
                    <p className="mt-1 text-sm text-sidebar-foreground/90 leading-snug">{transcript}</p>
                  </div>
                )}
                {response && (
                  <div className="p-3 rounded-xl bg-amber-glow/10 border border-amber-glow/30 animate-fade-in">
                    <div className="text-[10px] uppercase tracking-wider text-amber-glow">IHINGA</div>
                    <p className="mt-1 text-sm text-sidebar-foreground leading-snug">{response}</p>
                  </div>
                )}
                {!transcript && !response && (
                  <p className="text-center text-xs text-sidebar-foreground/50">
                    Ask in Kinyarwanda, English or French about weather, crops, markets…
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
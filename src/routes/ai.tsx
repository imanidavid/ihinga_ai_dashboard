import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useState } from "react";
import { Sparkles, Send, Bot, Mic } from "lucide-react";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "AI Assistant · IHINGA AI" }] }),
  component: AiPage,
});

type Msg = { role: "user" | "ai"; text: string };

const suggestions = [
  "When should I irrigate my maize?",
  "What's the best fertilizer for coffee in Musanze?",
  "Predict my bean harvest for next month",
  "How do I prevent leaf rust on my coffee?",
];

function AiPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Muraho Jean! I've reviewed your fields this morning. How can I help your farm today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, {
        role: "ai",
        text: "Based on your soil moisture (68%) and the 78% rain probability on Wednesday morning, I'd hold irrigation for 36 hours. You'll save ~1,200L and protect root oxygenation. Want me to schedule it?",
      }]);
      setTyping(false);
    }, 900);
  };

  return (
    <PageShell title="AI Assistant" subtitle="Your always-on agricultural co-pilot, fluent in Kinyarwanda, English and French.">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 rounded-3xl bg-card border border-border/50 shadow-card flex flex-col h-[640px]">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border/50">
            <div className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-sunrise shadow-glow">
              <Bot className="w-5 h-5 text-sidebar" />
            </div>
            <div>
              <div className="font-display">IHINGA AI</div>
              <div className="text-xs text-forest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-glow-pulse" /> Online · context: 4 fields
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-sunrise text-sidebar rounded-br-sm"
                    : "bg-secondary rounded-bl-sm"
                }`}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-secondary text-sm flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-4 border-t border-border/50 flex gap-2">
            <button type="button" className="grid place-items-center w-11 h-11 rounded-xl bg-secondary hover:bg-secondary/70">
              <Mic className="w-4 h-4" />
            </button>
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crops, weather, markets…"
              className="flex-1 px-4 rounded-xl bg-secondary/60 outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
            <button type="submit" className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-sunrise text-sidebar shadow-glow">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <aside className="col-span-12 lg:col-span-4 space-y-4">
          <div className="rounded-3xl p-6 bg-gradient-forest text-white shadow-card">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-amber-glow" /> Quick suggestions
            </div>
            <div className="mt-4 space-y-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="w-full text-left text-sm px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
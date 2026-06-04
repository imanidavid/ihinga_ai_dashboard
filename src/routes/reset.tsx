import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import hero from "@/assets/hero-rwanda.jpg";

export const Route = createFileRoute("/reset")({
  head: () => ({ meta: [{ title: "Reset password · IHINGA AI" }] }),
  component: ResetPage,
});

function ResetPage() {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (pw !== "pass123") return setError("Invalid demo password (use pass123)");
    if (pw !== confirm) return setError("Passwords do not match");
    setLoading(true);
    setTimeout(() => {
      setDone(true);
      setTimeout(() => navigate({ to: "/signin" }), 1500);
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-sidebar text-sidebar-foreground">
      <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar/90 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-forest/30 blur-3xl animate-glow-pulse" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/login" className="inline-flex items-center gap-3 mb-6">
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-sunrise">
              <Leaf className="w-5 h-5 text-sidebar" />
            </div>
            <div className="font-display text-xl">IHINGA AI</div>
          </Link>

          <div className="glass-dark rounded-3xl p-8 lg:p-10 shadow-luxe border border-white/10 relative overflow-hidden">
            {done && (
              <div className="absolute inset-0 z-20 bg-sidebar/95 backdrop-blur-xl grid place-items-center animate-fade-in">
                <div className="text-center">
                  <div className="grid place-items-center w-20 h-20 rounded-full bg-gradient-sunrise mx-auto shadow-glow animate-glow-pulse">
                    <CheckCircle2 className="w-10 h-10 text-sidebar" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">Password reset</h3>
                  <p className="mt-1 text-sm text-sidebar-foreground/70">Redirecting to sign in…</p>
                </div>
              </div>
            )}

            <h2 className="font-display text-3xl">Set a new password</h2>
            <p className="mt-1.5 text-sm text-sidebar-foreground/70">
              For the demo, use <span className="font-mono text-amber-glow">pass123</span>.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <Field label="New password">
                <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
                  placeholder="pass123"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-sidebar-foreground/40" />
              </Field>
              <Field label="Confirm password">
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  placeholder="pass123"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-sidebar-foreground/40" />
              </Field>

              {error && (
                <div className="text-xs text-clay bg-clay/10 border border-clay/30 rounded-lg px-3 py-2 animate-fade-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-sunrise text-sidebar font-semibold shadow-glow hover:shadow-luxe transition-all disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">{label}</label>
      <div className="mt-1.5 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-amber-glow/50 transition">
        <Lock className="w-4 h-4 text-amber-glow/80" />
        {children}
      </div>
    </div>
  );
}
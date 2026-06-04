import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, ArrowRight, Loader2, KeyRound } from "lucide-react";
import hero from "@/assets/hero-rwanda.jpg";

export const Route = createFileRoute("/forgot")({
  head: () => ({ meta: [{ title: "Recover password · IHINGA AI" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setLoading(true);
    setTimeout(() => navigate({ to: "/otp", search: { mode: "reset" } as any }), 700);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-sidebar text-sidebar-foreground">
      <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar/90 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-amber-glow/20 blur-3xl animate-glow-pulse" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/login" className="inline-flex items-center gap-3 mb-6">
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-sunrise">
              <Leaf className="w-5 h-5 text-sidebar" />
            </div>
            <div className="font-display text-xl">IHINGA AI</div>
          </Link>

          <div className="glass-dark rounded-3xl p-8 lg:p-10 shadow-luxe border border-white/10">
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-glow/15 border border-amber-glow/30">
              <KeyRound className="w-7 h-7 text-amber-glow" />
            </div>
            <h2 className="mt-5 font-display text-3xl">Recover access</h2>
            <p className="mt-1.5 text-sm text-sidebar-foreground/70">
              Enter your registered email or phone — we'll send a verification code.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">
                  Email or phone
                </label>
                <div className="mt-1.5 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-amber-glow/50 transition">
                  <Mail className="w-4 h-4 text-amber-glow/80" />
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="jean@ihinga.rw"
                    className="w-full bg-transparent outline-none text-sm placeholder:text-sidebar-foreground/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-sunrise text-sidebar font-semibold shadow-glow hover:shadow-luxe transition-all disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Send recovery code
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-sidebar-foreground/60">
              Remembered?{" "}
              <Link to="/signin" className="text-amber-glow hover:underline">Back to sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Leaf, ShieldCheck, Loader2, CheckCircle2, RotateCw } from "lucide-react";
import { useRole } from "@/components/role-provider";
import type { Role } from "@/lib/roles";
import hero from "@/assets/hero-rwanda.jpg";

export const Route = createFileRoute("/otp")({
  head: () => ({ meta: [{ title: "Verify · IHINGA AI" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    mode: (s.mode as "signup" | "reset") ?? "signup",
  }),
  component: OtpPage,
});

const CORRECT_OTP = "000000";

function OtpPage() {
  const { setAccount } = useRole();
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const update = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    setError(null);
    if (ch && i < 5) refs.current[i + 1]?.focus();
    if (next.every((d) => d) && !verifying) verify(next.join(""));
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.split("").concat(Array(6).fill("")).slice(0, 6);
    setDigits(next);
    if (next.every((d) => d)) verify(next.join(""));
  };

  const verify = (code: string) => {
    setVerifying(true);
    setTimeout(() => {
      if (code !== CORRECT_OTP) {
        setError("Invalid verification code. Try 000000 for demo.");
        setDigits(["", "", "", "", "", ""]);
        setVerifying(false);
        refs.current[0]?.focus();
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        if (mode === "reset") {
          navigate({ to: "/reset" });
        } else {
          try {
            const raw = sessionStorage.getItem("ihinga-pending");
            if (raw) {
              const { email, role } = JSON.parse(raw) as { email: string; role: Role };
              setAccount(email, role);
              sessionStorage.removeItem("ihinga-pending");
            }
          } catch {}
          navigate({ to: "/" });
        }
      }, 1100);
    }, 800);
  };

  const resend = () => { setCountdown(45); setError(null); };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-sidebar text-sidebar-foreground">
      <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar/90 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-glow/15 blur-3xl animate-glow-pulse" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/login" className="inline-flex items-center gap-3 mb-6">
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-sunrise">
              <Leaf className="w-5 h-5 text-sidebar" />
            </div>
            <div className="font-display text-xl">IHINGA AI</div>
          </Link>

          <div className="glass-dark rounded-3xl p-8 lg:p-10 shadow-luxe border border-white/10 relative overflow-hidden">
            {success && (
              <div className="absolute inset-0 z-20 bg-sidebar/95 backdrop-blur-xl grid place-items-center animate-fade-in">
                <div className="text-center">
                  <div className="grid place-items-center w-20 h-20 rounded-full bg-gradient-sunrise mx-auto shadow-glow animate-glow-pulse">
                    <CheckCircle2 className="w-10 h-10 text-sidebar" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">Verified</h3>
                  <p className="mt-1 text-sm text-sidebar-foreground/70">Entering the network…</p>
                </div>
              </div>
            )}

            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-glow/15 border border-amber-glow/30">
              <ShieldCheck className="w-7 h-7 text-amber-glow" />
            </div>
            <h2 className="mt-5 font-display text-3xl">Verify it's you</h2>
            <p className="mt-1.5 text-sm text-sidebar-foreground/70">
              We sent a 6-digit code to your phone. Demo code:{" "}
              <span className="font-mono text-amber-glow">000000</span>
            </p>

            <div className="mt-7 flex justify-between gap-2" onPaste={onPaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { refs.current[i] = el; }}
                  value={d}
                  onChange={(e) => update(i, e.target.value)}
                  onKeyDown={(e) => onKey(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-display rounded-xl bg-white/5 border-2 outline-none transition-all ${
                    error ? "border-clay/60" :
                    d ? "border-amber-glow shadow-glow" : "border-white/10 focus:border-amber-glow/50"
                  }`}
                />
              ))}
            </div>

            {error && (
              <div className="mt-4 text-xs text-clay bg-clay/10 border border-clay/30 rounded-lg px-3 py-2 animate-fade-in">
                {error}
              </div>
            )}

            {verifying && !success && (
              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-amber-glow animate-fade-in">
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying…
              </div>
            )}

            <div className="mt-7 flex items-center justify-between text-xs text-sidebar-foreground/60">
              <span>
                Resend in{" "}
                <span className="font-mono text-amber-glow">
                  {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                  {String(countdown % 60).padStart(2, "0")}
                </span>
              </span>
              <button
                disabled={countdown > 0}
                onClick={resend}
                className="inline-flex items-center gap-1.5 hover:text-amber-glow disabled:opacity-40 transition"
              >
                <RotateCw className="w-3.5 h-3.5" /> Resend code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
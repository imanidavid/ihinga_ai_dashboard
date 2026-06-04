import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Leaf,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Loader2,
  Sprout,
  Users,
  Radio,
  GraduationCap,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import { useRole } from "@/components/role-provider";
import { ROLE_META, ALL_ROLES, type Role } from "@/lib/roles";
import hero from "@/assets/hero-rwanda.jpg";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [{ title: "Sign in · IHINGA AI" }] }),
  component: SignInPage,
});

const PASSWORD = "pass123";
const QUICK_ROLE_ORDER: Role[] = ["farmer", "officer", "agronomist", "researcher", "cooperative", "admin"];

const roleIcons: Record<Role, typeof Sprout> = {
  farmer: Sprout,
  officer: Radio,
  agronomist: GraduationCap,
  researcher: FlaskConical,
  cooperative: Users,
  admin: ShieldCheck,
};

function SignInPage() {
  const { role, setAccount, mounted } = useRole();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("farmer");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mounted && role) navigate({ to: "/" });
  }, [mounted, role, navigate]);

  const submit = () => {
    setError(null);
    const trimmedEmail = email.trim();

    if (!trimmedEmail) return setError("Enter your email or phone");
    if (password !== PASSWORD) return setError("Invalid password");

    setLoading(true);
    sessionStorage.setItem("ihinga-pending", JSON.stringify({ email: trimmedEmail, role: selectedRole }));
    setTimeout(() => {
      navigate({ to: "/otp", search: { mode: "signup" } as any });
    }, 700);
  };

  const loginAsRole = (quickRole: Role) => {
    setAccount(`${quickRole}@ihinga.ai`, quickRole);
    navigate({ to: "/" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-sidebar text-sidebar-foreground">
      <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar/85 to-transparent" />
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-amber-glow/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-forest/30 blur-3xl animate-glow-pulse" />
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16">
          <Link to="/signin" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow/80 rounded-2xl">
            <div className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-sunrise shadow-glow">
              <Leaf className="w-6 h-6 text-sidebar" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display text-2xl tracking-tight">IHINGA AI</div>
              <div className="text-[11px] text-sidebar-foreground/60 uppercase tracking-widest">
                Agricultural Intelligence
              </div>
            </div>
          </Link>

          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-[11px] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-glow" /> Secure operator login
            </div>
            <h1 className="font-display text-5xl xl:text-6xl leading-[1.05] text-balance">
              Welcome Back
            </h1>
            <p className="text-lg text-sidebar-foreground/80 max-w-md">
              Access Rwanda Agricultural Intelligence
            </p>
          </div>

          <div className="text-xs text-sidebar-foreground/50">
            Secure access for Rwanda&apos;s agricultural intelligence network
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-lg glass-dark rounded-3xl p-7 sm:p-8 lg:p-10 shadow-luxe border border-white/10">
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-sunrise">
                <Leaf className="w-5 h-5 text-sidebar" />
              </div>
              <div>
                <div className="font-display text-xl">IHINGA AI</div>
                <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">
                  Rwanda Agricultural Intelligence
                </div>
              </div>
            </div>

            <h2 className="font-display text-3xl">Sign in to your account</h2>
            <p className="mt-1.5 text-sm text-sidebar-foreground/70">
              Access the IHINGA AI platform
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); submit(); }}
              className="mt-6 space-y-4"
            >
              <Field icon={Mail} label="Email / Phone">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@ihinga.rw"
                  autoComplete="username"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-sidebar-foreground/40"
                />
              </Field>

              <Field icon={Lock} label="Password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-sidebar-foreground/40"
                />
              </Field>

              <div>
                <label className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">
                  Role Selector
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as Role)}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-amber-glow/50 focus:ring-2 focus:ring-amber-glow/30 transition"
                >
                  {ALL_ROLES.map((r) => (
                    <option key={r} value={r} className="bg-sidebar">
                      {ROLE_META[r].label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="text-xs text-clay bg-clay/10 border border-clay/30 rounded-lg px-3 py-2 animate-fade-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-sunrise text-sidebar font-semibold shadow-glow hover:shadow-luxe transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Sign In
              </button>

              <div className="pt-2">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <h3 className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">
                    Quick Role Access
                  </h3>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUICK_ROLE_ORDER.map((quickRole) => {
                    const Icon = roleIcons[quickRole];
                    const meta = ROLE_META[quickRole];
                    return (
                      <button
                        key={quickRole}
                        type="button"
                        onClick={() => loginAsRole(quickRole)}
                        aria-label={`Quick role access as ${meta.label}`}
                        className="group text-left rounded-xl glass-dark border border-white/10 px-3 py-2.5 hover:bg-white/10 hover:border-amber-glow/40 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow/80 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="grid place-items-center w-8 h-8 rounded-lg bg-amber-glow/15 border border-amber-glow/25 text-amber-glow group-hover:bg-gradient-sunrise group-hover:text-sidebar transition-all shrink-0">
                            <Icon className="w-4 h-4" strokeWidth={2.2} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-medium leading-tight">{meta.label}</span>
                            <span className="block text-[10px] text-sidebar-foreground/55 truncate">
                              {meta.tagline}
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-between text-xs text-sidebar-foreground/60">
              <Link to="/forgot" className="hover:text-amber-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow/80 rounded transition">Forgot password?</Link>
              <Link to="/signup" className="hover:text-amber-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow/80 rounded transition">Create account →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">{label}</label>
      <div className="mt-1.5 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-amber-glow/50 focus-within:ring-2 focus-within:ring-amber-glow/30 transition">
        <Icon className="w-4 h-4 text-amber-glow/80 shrink-0" />
        {children}
      </div>
    </div>
  );
}

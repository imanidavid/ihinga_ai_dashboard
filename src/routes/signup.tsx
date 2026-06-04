import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, User, Mail, Phone, MapPin, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRole } from "@/components/role-provider";
import { ROLE_META, ALL_ROLES, type Role } from "@/lib/roles";
import hero from "@/assets/hero-rwanda.jpg";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account · IHINGA AI" }] }),
  component: SignUpPage,
});

const DISTRICTS = ["Musanze", "Kigali", "Huye", "Rubavu", "Nyagatare", "Karongi", "Gicumbi", "Rwamagana"];

function SignUpPage() {
  const { role, mounted } = useRole();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", district: "Musanze", sector: "",
    role: "farmer" as Role, password: "", confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (mounted && role) navigate({ to: "/" }); }, [mounted, role, navigate]);

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.fullName || !form.email || !form.phone || !form.sector)
      return setError("Please complete all fields");
    if (form.password !== "pass123") return setError("Invalid demo password");
    if (form.password !== form.confirm) return setError("Passwords do not match");
    setLoading(true);
    sessionStorage.setItem("ihinga-pending", JSON.stringify({ email: form.email, role: form.role }));
    setTimeout(() => navigate({ to: "/otp", search: { mode: "signup" } as any }), 600);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-sidebar text-sidebar-foreground">
      <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar/85 to-transparent" />
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-amber-glow/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-forest/30 blur-3xl animate-glow-pulse" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-2xl">
          <Link to="/login" className="inline-flex items-center gap-3 mb-6 group">
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-sunrise">
              <Leaf className="w-5 h-5 text-sidebar" />
            </div>
            <div>
              <div className="font-display text-xl">IHINGA AI</div>
              <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">Join the network</div>
            </div>
          </Link>

          <div className="glass-dark rounded-3xl p-8 lg:p-10 shadow-luxe border border-white/10">
            <h2 className="font-display text-3xl lg:text-4xl">Create your account</h2>
            <p className="mt-1.5 text-sm text-sidebar-foreground/70">
              Register to access the Rwanda Agricultural Intelligence platform.
            </p>

            <form onSubmit={submit} className="mt-7 grid sm:grid-cols-2 gap-4">
              <Input icon={User} label="Full name" value={form.fullName} onChange={(v) => set("fullName", v)} placeholder="Jean Mugabo" />
              <Input icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="jean@ihinga.rw" />
              <Input icon={Phone} label="Phone number" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+250 78 000 0000" />
              <Select icon={MapPin} label="District" value={form.district} onChange={(v) => set("district", v)} options={DISTRICTS} />
              <Input icon={MapPin} label="Sector" value={form.sector} onChange={(v) => set("sector", v)} placeholder="Kinigi" />
              <Select label="Role" value={form.role} onChange={(v) => set("role", v as Role)}
                options={ALL_ROLES.map((r) => ({ v: r, l: ROLE_META[r].label }))} />
              <Input icon={Lock} label="Password" type="password" value={form.password} onChange={(v) => set("password", v)} placeholder="pass123" />
              <Input icon={Lock} label="Confirm password" type="password" value={form.confirm} onChange={(v) => set("confirm", v)} placeholder="pass123" />

              {error && (
                <div className="sm:col-span-2 text-xs text-clay bg-clay/10 border border-clay/30 rounded-lg px-3 py-2 animate-fade-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-sunrise text-sidebar font-semibold shadow-glow hover:shadow-luxe transition-all disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Create account & verify
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-sidebar-foreground/60">
              Already registered?{" "}
              <Link to="/signin" className="text-amber-glow hover:underline">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  icon?: any;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
};
function Input({ icon: Icon, label, value, onChange, type = "text", placeholder }: FieldProps) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">{label}</label>
      <div className="mt-1.5 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-amber-glow/50 transition">
        {Icon && <Icon className="w-4 h-4 text-amber-glow/80 shrink-0" />}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm placeholder:text-sidebar-foreground/40" />
      </div>
    </div>
  );
}

type SelectProps = {
  icon?: any;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: (string | { v: string; l: string })[];
};
function Select({ icon: Icon, label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">{label}</label>
      <div className="mt-1.5 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-amber-glow/50 transition">
        {Icon && <Icon className="w-4 h-4 text-amber-glow/80 shrink-0" />}
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none text-sm">
          {options.map((o: any) =>
            typeof o === "string"
              ? <option key={o} value={o} className="bg-sidebar">{o}</option>
              : <option key={o.v} value={o.v} className="bg-sidebar">{o.l}</option>
          )}
        </select>
      </div>
    </div>
  );
}
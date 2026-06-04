import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { type Role, ALL_ROLES } from "@/lib/roles";

type Ctx = {
  role: Role | null;
  setRole: (r: Role) => void;
  email: string | null;
  setAccount: (email: string, role: Role) => void;
  signOut: () => void;
  mounted: boolean;
};

const RoleCtx = createContext<Ctx>({
  role: null, setRole: () => {}, email: null, setAccount: () => {}, signOut: () => {}, mounted: false,
});

const KEY = "ihinga-role";
const EMAIL_KEY = "ihinga-email";

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role | null>(null);
  const [email, setEmailState] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlRole = params.get("role") as Role | null;
      
      if (urlRole && ALL_ROLES.includes(urlRole)) {
        setRoleState(urlRole);
        localStorage.setItem(KEY, urlRole);
      } else {
        const stored = localStorage.getItem(KEY) as Role | null;
        if (stored) setRoleState(stored);
      }
      
      const storedEmail = localStorage.getItem(EMAIL_KEY);
      if (storedEmail) setEmailState(storedEmail);
    } catch {}
    setMounted(true);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    try { localStorage.setItem(KEY, r); } catch {}
  };
  const setAccount = (e: string, r: Role) => {
    setRoleState(r); setEmailState(e);
    try {
      localStorage.setItem(KEY, r);
      localStorage.setItem(EMAIL_KEY, e);
    } catch {}
  };
  const signOut = () => {
    setRoleState(null); setEmailState(null);
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(EMAIL_KEY);
    } catch {}
  };

  return (
    <RoleCtx.Provider value={{ role, setRole, email, setAccount, signOut, mounted }}>
      {children}
    </RoleCtx.Provider>
  );
}

export const useRole = () => useContext(RoleCtx);
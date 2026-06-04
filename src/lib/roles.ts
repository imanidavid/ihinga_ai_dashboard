import {
  LayoutDashboard, CloudSun, AlertTriangle, Sprout, Store, Users,
  GraduationCap, Bot, Activity, FileBarChart, Settings, Map,
  Radio, Brain, FlaskConical, ShieldCheck, LineChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Role =
  | "farmer"
  | "cooperative"
  | "officer"
  | "agronomist"
  | "researcher"
  | "admin";

export type NavItem = { to: string; label: string; icon: LucideIcon };

export const ROLE_META: Record<Role, {
  label: string;
  short: string;
  tagline: string;
  badge: string;
  initials: string;
  person: string;
  district: string;
}> = {
  farmer: {
    label: "Farmer", short: "FARMER",
    tagline: "Smart Farming for Rwanda",
    badge: "Field Operator",
    initials: "JM", person: "Jean Mugabo", district: "Musanze · Northern",
  },
  cooperative: {
    label: "Cooperative Leader", short: "COOPERATIVE",
    tagline: "Coordinating shared harvests",
    badge: "Cooperative",
    initials: "AK", person: "Aline Karemera", district: "Huye · Southern",
  },
  officer: {
    label: "Agricultural Officer", short: "OFFICER",
    tagline: "National Climate Intelligence",
    badge: "Government · MINAGRI",
    initials: "EN", person: "Eric Nzeyimana", district: "All Districts · National",
  },
  agronomist: {
    label: "Agronomist", short: "AGRONOMIST",
    tagline: "Crop science & advisory",
    badge: "Field Expert",
    initials: "CU", person: "Claudine Uwase", district: "Nyagatare · Eastern",
  },
  researcher: {
    label: "Researcher", short: "RESEARCH",
    tagline: "Climate & yield modelling",
    badge: "RAB Research",
    initials: "PM", person: "Patrick Munyaneza", district: "Kigali · Lab",
  },
  admin: {
    label: "Admin", short: "ADMIN",
    tagline: "Platform stewardship",
    badge: "Root Access",
    initials: "IH", person: "IHINGA Admin", district: "Kigali HQ",
  },
};

const farmerNav: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/climate", label: "Climate Intelligence", icon: CloudSun },
  { to: "/weather", label: "Weather Alerts", icon: AlertTriangle },
  { to: "/crops", label: "Crop Monitoring", icon: Sprout },
  { to: "/marketplace", label: "Marketplace", icon: Store },
  { to: "/cooperatives", label: "Cooperatives", icon: Users },
  { to: "/experts", label: "Experts", icon: GraduationCap },
  { to: "/ai", label: "AI Assistant", icon: Bot },
  { to: "/timeline", label: "Activity Timeline", icon: Activity },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/settings", label: "Settings", icon: Settings },
];

const officerNav: NavItem[] = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/climate", label: "Climate Intelligence", icon: CloudSun },
  { to: "/districts", label: "District Monitoring", icon: Map },
  { to: "/timeline", label: "Farmer Activity", icon: Radio },
  { to: "/alerts", label: "Alerts & Interventions", icon: AlertTriangle },
  { to: "/cooperatives", label: "Cooperative Oversight", icon: Users },
  { to: "/reports", label: "Analytics", icon: LineChart },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/intelligence", label: "AI Intelligence", icon: Brain },
  { to: "/settings", label: "Settings", icon: Settings },
];

const coopNav: NavItem[] = [
  { to: "/", label: "Cooperative Hub", icon: LayoutDashboard },
  { to: "/cooperatives", label: "Members", icon: Users },
  { to: "/crops", label: "Shared Fields", icon: Sprout },
  { to: "/marketplace", label: "Aggregated Sales", icon: Store },
  { to: "/timeline", label: "Member Activity", icon: Activity },
  { to: "/reports", label: "Performance", icon: FileBarChart },
  { to: "/ai", label: "AI Assistant", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
];

const agronomistNav: NavItem[] = [
  { to: "/", label: "Advisory Desk", icon: LayoutDashboard },
  { to: "/crops", label: "Crop Diagnostics", icon: Sprout },
  { to: "/experts", label: "Farmer Consults", icon: GraduationCap },
  { to: "/climate", label: "Climate Intelligence", icon: CloudSun },
  { to: "/intelligence", label: "AI Recommendations", icon: Brain },
  { to: "/reports", label: "Field Reports", icon: FileBarChart },
  { to: "/settings", label: "Settings", icon: Settings },
];

const researcherNav: NavItem[] = [
  { to: "/", label: "Research Lab", icon: LayoutDashboard },
  { to: "/intelligence", label: "Models & Forecasts", icon: Brain },
  { to: "/climate", label: "Climate Datasets", icon: CloudSun },
  { to: "/districts", label: "Geospatial", icon: Map },
  { to: "/reports", label: "Publications", icon: FlaskConical },
  { to: "/settings", label: "Settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { to: "/", label: "Platform Health", icon: LayoutDashboard },
  { to: "/cooperatives", label: "Organizations", icon: Users },
  { to: "/reports", label: "System Reports", icon: FileBarChart },
  { to: "/intelligence", label: "AI Operations", icon: Brain },
  { to: "/settings", label: "System Settings", icon: ShieldCheck },
];

export const ROLE_NAV: Record<Role, NavItem[]> = {
  farmer: farmerNav,
  officer: officerNav,
  cooperative: coopNav,
  agronomist: agronomistNav,
  researcher: researcherNav,
  admin: adminNav,
};

export const ALL_ROLES: Role[] = [
  "farmer", "cooperative", "officer", "agronomist", "researcher", "admin",
];
import {
  LayoutGrid,
  Compass,
  Terminal,
  Heart,
  Zap,
  ListTodo,
} from "lucide-react";

export const CATEGORY_ICON_MAP = {
  all: LayoutGrid,
  general: Compass,
  work: Terminal,
  personal: Heart,
  ideas: Zap,
  tasks: ListTodo,
};

export const CATEGORIES = [
  {
    id: "all",
    label: "All Notes",
    iconKey: "all",
    badgeColor: "text-zinc-500 bg-zinc-100 dark:bg-zinc-800",
  },
  {
    id: "general",
    label: "General",
    iconKey: "general",
    badgeColor: "text-zinc-650 bg-zinc-100 dark:bg-zinc-850",
  },
  {
    id: "work",
    label: "Work",
    iconKey: "work",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: "personal",
    label: "Personal",
    iconKey: "personal",
    badgeColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/20",
  },
  {
    id: "ideas",
    label: "Ideas",
    iconKey: "ideas",
    badgeColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    id: "tasks",
    label: "Tasks",
    iconKey: "tasks",
    badgeColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/20",
  },
] as const;

export const ZEN_COLORS = {
  slate: {
    id: "slate",
    name: "Warm Oat",
    dot: "bg-zinc-450 dark:bg-zinc-550",
    hoverBorder: "hover:border-zinc-400 dark:hover:border-zinc-600",
    glow: "hover:shadow-[0_0_20px_rgba(113,113,122,0.12)]",
    textHover: "group-hover:text-zinc-900 dark:group-hover:text-zinc-50",
    headerHover: "group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/20",
    badge:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800",
  },
  blue: {
    id: "blue",
    name: "Misty Clay",
    dot: "bg-blue-500 dark:bg-blue-600",
    hoverBorder: "hover:border-blue-500/70 dark:hover:border-blue-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.14)]",
    textHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    headerHover: "group-hover:bg-blue-500/5 dark:group-hover:bg-blue-500/10",
    badge:
      "bg-blue-50 text-blue-700 dark:bg-[#15233c]/85 dark:text-blue-300 border border-blue-100/30 dark:border-blue-900/30",
  },
  emerald: {
    id: "emerald",
    name: "Earthy Sage",
    dot: "bg-emerald-500 dark:bg-emerald-600",
    hoverBorder: "hover:border-emerald-500/70 dark:hover:border-emerald-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.14)]",
    textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    headerHover:
      "group-hover:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10",
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-[#112519]/85 dark:text-emerald-300 border border-emerald-100/30 dark:border-emerald-900/30",
  },
  amber: {
    id: "amber",
    name: "Harvest Mustard",
    dot: "bg-amber-500 dark:bg-amber-600",
    hoverBorder: "hover:border-amber-500/70 dark:hover:border-amber-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.14)]",
    textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    headerHover: "group-hover:bg-amber-500/5 dark:group-hover:bg-amber-500/10",
    badge:
      "bg-amber-50 text-amber-700 dark:bg-[#251b08]/85 dark:text-amber-300 border border-amber-100/30 dark:border-amber-900/30",
  },
  rose: {
    id: "rose",
    name: "Terracotta",
    dot: "bg-rose-500 dark:bg-rose-600",
    hoverBorder: "hover:border-rose-500/70 dark:hover:border-rose-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.14)]",
    textHover: "group-hover:text-rose-650 dark:group-hover:text-rose-400",
    headerHover: "group-hover:bg-rose-500/5 dark:group-hover:bg-rose-500/10",
    badge:
      "bg-rose-50 text-rose-700 dark:bg-[#2e190e]/85 dark:text-rose-300 border border-rose-100/30 dark:border-rose-950/30",
  },
  violet: {
    id: "violet",
    name: "Lavender Mist",
    dot: "bg-violet-500 dark:bg-violet-650",
    hoverBorder: "hover:border-violet-500/70 dark:hover:border-violet-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.14)]",
    textHover: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    headerHover:
      "group-hover:bg-violet-500/5 dark:group-hover:bg-violet-500/10",
    badge:
      "bg-indigo-50 text-indigo-700 dark:bg-[#191937]/85 dark:text-indigo-300 border border-indigo-100/30 dark:border-indigo-950/30",
  },
} as const;

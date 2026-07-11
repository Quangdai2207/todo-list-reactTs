import type { Priority } from "../Job";

interface PriorityMeta {
    label: string,
    text: string,
    bg: string
}


export const priorityMeta: Record<Priority, PriorityMeta> = {
    "low": { label: "Thấp", text: "text-slate-300", bg: "bg-slate-400/10 border-slate-400/20" },
    "medium": { label: "Trung bình", text: "text-amber-300", bg: "bg-amber-400/10 border-amber-400/20" },
    "high": { label: "Cao", text: "text-rose-300", bg: "bg-rose-400/10 border-rose-400/20" },
  };
  

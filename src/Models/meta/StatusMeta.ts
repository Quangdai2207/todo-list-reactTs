import type { Status } from "../Job";

interface StatusMeta {
    label: string,
    dot: string,
    text: string,
    bg: string
}

export const statusMeta: Record<Status, StatusMeta> = {
    "todo": { label: "Chưa làm", dot: "bg-slate-400", text: "text-slate-300", bg: "bg-slate-400/10 border-slate-400/20" },
    "progress": { label: "Đang làm", dot: "bg-sky-400", text: "text-sky-300", bg: "bg-sky-400/10 border-sky-400/20" },
    "done": { label: "Hoàn thành", dot: "bg-emerald-400", text: "text-emerald-300", bg: "bg-emerald-400/10 border-emerald-400/20" },
  };
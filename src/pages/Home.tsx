import {
  User,
  Mail,
  Phone,
  Tag,
  ListChecks,
  ArrowRight,
  Notebook,
  CheckCircle2,
  Circle,
  ListTodo,
  CalendarCheck2,
  PenLine,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JobRepository } from "../repository/JobRepository";
import { NoteRepository } from "../repository/NoteRepository";
import { useEffect } from "react";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trang chủ - Welcome";
  }, []);

  const info = [
    {
      icon: Notebook,
      label: "",
      value: "Hướng Dẫn Sử Dụng",
      href: "/todo-list-document",
    },
    {
      icon: User,
      label: "Tác giả",
      value: "Dai Tran",
    },
    {
      icon: Mail,
      label: "Phản hồi thắc mắc",
      value: "daitran.inbox@gmail.com",
      href: "mailto:daitran.inbox@gmail.com",
    },
    {
      icon: Phone,
      label: "Hotline hỗ trợ",
      value: "08190 999 31",
      href: "tel:0909999999",
    },
    {
      icon: Tag,
      label: "Phiên bản",
      value: "1.00",
    },
  ];

  // Init database session storage when access home page
  JobRepository.initStorage();
  NoteRepository.initDatabase();

  const guide = (href: string) => {
    navigate(href);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b12] flex flex-col items-center justify-center px-4 py-10 sm:px-6 md:px-8">
      {/* Ambient glow background, n8n-style */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-fuchsia-600/30 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-violet-500/20 blur-[90px]" />

      {/* Faint dot-grid, hints at a structured list/board without being loud */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Todo-list themed decorations floating around the card — signals "this is a task app" at a glance */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {/* Mini "task card" top-left, tilted like a sticky note */}
        <div className="absolute top-[12%] left-[8%] w-40 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-3 -rotate-6 opacity-40">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
            <div className="h-1.5 flex-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Circle className="w-3.5 h-3.5 text-white/25" strokeWidth={2} />
            <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-3.5 h-3.5 text-white/25" strokeWidth={2} />
            <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
          </div>
        </div>

        {/* Mini "task card" bottom-right, tilted the other way */}
        <div className="absolute bottom-[14%] right-[9%] w-36 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-3 rotate-6 opacity-40">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} />
            <div className="h-1.5 flex-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} />
            <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
          </div>
        </div>

        {/* Loose scattered icons for extra flavor */}
        <ListTodo className="absolute top-[22%] right-[14%] w-6 h-6 text-white/15 rotate-12" strokeWidth={1.75} />
        <CalendarCheck2 className="absolute bottom-[24%] left-[12%] w-7 h-7 text-white/15 -rotate-12" strokeWidth={1.75} />
        <PenLine className="absolute top-[46%] left-[5%] w-5 h-5 text-white/10 rotate-6" strokeWidth={1.75} />
        <CheckCircle2 className="absolute top-[8%] right-[20%] w-5 h-5 text-white/10" strokeWidth={1.75} />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-6 sm:p-8 md:p-10">
        {/* subtle top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl" />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 to-fuchsia-500/10 blur-md" />
            <ListChecks
              className="relative w-7 h-7 sm:w-9 sm:h-9 text-orange-400"
              strokeWidth={1.75}
            />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Todo List
          </h1>
          <p className="text-sm sm:text-base text-white/40 mt-1">
            Ứng dụng quản lý công việc của bạn
          </p>
        </div>

        {/* CTA button */}
        <button
          onClick={() => navigate("/todo-list")}
          type="button"
          className="w-full mb-7 group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 sm:py-3.5 font-medium text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_-4px_rgba(249,115,22,0.35)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_28px_-4px_rgba(217,70,239,0.45)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          Xem công việc
          <ArrowRight
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </button>

        {/* Divider with label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] uppercase tracking-wide text-white/30">
            Thông tin
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Info list */}
        <div className="flex flex-col gap-2.5 sm:gap-3 cursor-pointer">
          {info.map(({ icon: Icon, label, value, href }) => (
            <div
              onClick={() => {
                if (href) {
                  guide(href);
                }
              }}
              key={label || value}
              className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-colors px-4 py-3"
            >
              <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500/15 to-fuchsia-600/15 border border-white/10 flex items-center justify-center group-hover:border-orange-400/30 transition-colors">
                <Icon
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-orange-300"
                  strokeWidth={1.75}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-xs uppercase tracking-wide text-white/35">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="text-sm sm:text-base font-medium text-orange-300 hover:text-orange-200 transition-colors truncate block"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm sm:text-base font-medium text-white/85 truncate">
                    {value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer / copyright */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-xs sm:text-sm text-white/30">
            &copy; {new Date().getFullYear()} Copyright by Daitran
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
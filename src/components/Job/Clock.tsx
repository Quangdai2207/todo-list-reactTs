import { CalendarIcon, Clock, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { weekdayFull, Utilities as util } from "../../utils/FormatDate";

const USERNAME_STORAGE_KEY = "todo_user_name";

export const GreetingClock = () => {
  const [now, setNow] = useState(new Date());
  const [userName, setUserName] = useState("Enter Your Name");
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch Date time
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load saved username on first mount; if none saved yet, open edit mode right away
  useEffect(() => {
    const saved = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (saved) {
      setUserName(saved);
    } else {
      setIsEditing(true);
    }
  }, []);

  // Autofocus + select text whenever edit mode opens
  useEffect(() => {
    if (isEditing) {
      setDraftName(userName);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const commitName = () => {
    const trimmed = draftName.trim();
    if (trimmed) {
      setUserName(trimmed);
      localStorage.setItem(USERNAME_STORAGE_KEY, trimmed);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    // If there's no saved name yet, keep editing open instead of leaving it blank
    if (!userName) return;
    setDraftName(userName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitName();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const greeting = () => {
    const h = now.getHours();
    if (h < 11) return "Chào buổi sáng";
    if (h < 14) return "Chào buổi trưa";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-6 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
        <p className="text-sm sm:text-base text-white/80 flex items-center gap-1.5 flex-wrap">
          <span>{greeting()},</span>

          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={commitName}
              placeholder="Nhập tên của bạn..."
              className="min-w-[120px] max-w-[220px] rounded-md bg-white/[0.06] border border-orange-400/40 px-2 py-1 text-sm font-medium text-white placeholder:text-white/30 outline-none focus:border-orange-400/70 transition-colors"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="group inline-flex items-center gap-1 font-medium text-white hover:text-orange-300 transition-colors cursor-pointer"
              title="Nhấn để đổi tên"
            >
              {userName}
              <Pencil className="w-3 h-3 text-white/25 group-hover:text-orange-300/70 transition-colors" />
            </button>
          )}

          <span>👋</span>
        </p>

        <div className="flex items-center gap-3 text-xs sm:text-sm text-white/35">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            {weekdayFull[now.getDay()]}, {util.formatDate(util.toISODate(now))}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {now.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </div>
    </>
  );
};
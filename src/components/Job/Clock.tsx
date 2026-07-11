import { CalendarIcon, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { weekdayFull, Utilities as util } from "../../utils/FormatDate";

export const GreetingClock = () => {
  const [now, setNow] = useState(new Date());

  // Fetch Date time
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
        <p className="text-sm sm:text-base text-white/80">
          {greeting()}, <span className="font-medium text-white">Dai Tran</span>{" "}
          👋
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

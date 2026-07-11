import { ChevronLeft, ChevronRight } from "lucide-react";
import { Utilities as util, weekdayShort } from "../../utils/FormatDate";

interface Props {
  viewDate: Date;
  setViewDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedIso: string;
  onSelect: (iso: string) => void;
  onClear: () => void;
  onToday: () => void;
}

// ---- Generic date-picker dropdown, shared by the filter bar and the job forms ----
export const DatePickerDropdown = ({viewDate, setViewDate, selectedIso, onSelect, onClear, onToday}: Props) => {

  const isSameDate = (a: Date, isoStr: string) => isoStr && util.toISODate(a) === isoStr;

  const today = new Date();

  const cells = util.buildCalendarDays(viewDate);
  
  return (
    <div className="absolute z-30 mt-2 w-72 rounded-2xl border border-white/10 bg-[#15151f] shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-4">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() =>
            setViewDate(
              new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
            )
          }
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white/60" />
        </button>
        <p className="text-sm font-medium text-white/85">
          Tháng {viewDate.getMonth() + 1}, {viewDate.getFullYear()}
        </p>
        <button
          type="button"
          onClick={() =>
            setViewDate(
              new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
            )
          }
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white/60" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdayShort.map((w) => (
          <div
            key={w}
            className="text-center text-[10px] uppercase tracking-wide text-white/30 py-1"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map(({ date, inMonth }, i) => {
          const iso = util.toISODate(date);
          const isSelected = isSameDate(date, selectedIso);
          const isToday = util.toISODate(today) === iso;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(iso)}
              className={`aspect-square rounded-lg text-xs flex items-center justify-center transition-colors
                ${!inMonth ? "text-white/15" : "text-white/70"}
                ${
                  isSelected
                    ? "bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-semibold"
                    : "hover:bg-white/[0.08]"
                }
                ${isToday && !isSelected ? "border border-orange-400/50" : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          Xóa ngày
        </button>
        <button
          type="button"
          onClick={onToday}
          className="text-xs text-orange-300 hover:text-orange-200 transition-colors font-medium"
        >
          Hôm nay
        </button>
      </div>
    </div>
  );
};

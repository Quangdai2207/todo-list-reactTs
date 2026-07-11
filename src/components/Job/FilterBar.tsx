import { useState } from "react";
import type { Priority, Status } from "../../Models/Job";
import { statusMeta } from "../../Models/meta/StatusMeta";
import { RadioGroup } from "./RadioGroup";
import { priorityMeta } from "../../Models/meta/PriorityMeta";
import { DatePickerDropdown } from "./DatePIcker";
import { Utilities as util } from "../../utils/FormatDate";
import { CalendarIcon, RotateCcw } from "lucide-react";

interface Filter {
    status: Status | "all";
    priority: Priority | "all";
    dueDate: string;
  }
  
  interface Props {
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
    resetFilters: () => void;
  }

// ---- Reusable filter bar (used on all device layouts) ----
export const FilterBar = ({filters, setFilters, resetFilters} : Props) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarView, setCalendarView] = useState(new Date());

  const activeFilterCount =
    (filters.status !== "all" ? 1 : 0) +
    (filters.priority !== "all" ? 1 : 0) +
    (filters.dueDate ? 1 : 0);

  return (
    <>
      <div className="relative rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/35 mb-2">
            Trạng thái
          </p>
          <RadioGroup
            name="status-filter"
            value={filters.status}
            onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
            options={[
              { value: "all", label: "Tất cả" },
              ...(
                Object.entries(statusMeta) as [
                  Status,
                  (typeof statusMeta)[Status]
                ][]
              ).map(([key, m]) => ({
                value: key,
                label: m.label,
                dot: m.dot,
              })),
            ]}
          />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/35 mb-2">
            Độ ưu tiên
          </p>
          <RadioGroup
            name="priority-filter"
            value={filters.priority}
            onChange={(v) => setFilters((f) => ({ ...f, priority: v }))}
            options={[
              { value: "all", label: "Tất cả" },
              ...(
                Object.entries(priorityMeta) as [
                  Priority,
                  (typeof priorityMeta)[Priority]
                ][]
              ).map(([key, m]) => ({
                value: key,
                label: m.label,
              })),
            ]}
          />
        </div>

        <div className="relative">
          <p className="text-[11px] uppercase tracking-wide text-white/35 mb-2">
            Thời gian (hạn chót)
          </p>
          <button
            type="button"
            onClick={() => setCalendarOpen((v) => !v)}
            className="w-full flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-sm text-left outline-none hover:bg-white/[0.06] focus:border-orange-400/40 transition-colors"
          >
            <CalendarIcon className="w-4 h-4 text-white/40 shrink-0" />
            <span
              className={filters.dueDate ? "text-white/85" : "text-white/30"}
            >
              {filters.dueDate ? util.formatDate(filters.dueDate) : "Chọn ngày"}
            </span>
          </button>
          {calendarOpen && (
            <DatePickerDropdown
              viewDate={calendarView}
              setViewDate={setCalendarView}
              selectedIso={filters.dueDate}
              onSelect={(iso) => {
                setFilters((f) => ({ ...f, dueDate: iso }));
                setCalendarOpen(false);
              }}
              onClear={() => {
                setFilters((f) => ({ ...f, dueDate: "" }));
                setCalendarOpen(false);
              }}
              onToday={() => {
                const t = new Date();
                setCalendarView(t);
                setFilters((f) => ({ ...f, dueDate: util.toISODate(t) }));
                setCalendarOpen(false);
              }}
            />
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="sm:col-span-3 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-colors w-fit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Xóa bộ lọc ({activeFilterCount})
          </button>
        )}
      </div>
    </>
  );
};

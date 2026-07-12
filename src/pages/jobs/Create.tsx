import { CalendarIcon } from "lucide-react";
import { DatePickerDropdown } from "../../components/Job/DatePIcker";
import type { Priority, Status } from "../../Models/Job";
import { priorityMeta } from "../../Models/meta/PriorityMeta";
import { Utilities } from "../../utils/FormatDate";
import { statusMeta } from "../../Models/meta/StatusMeta";
import type { Dispatch, SetStateAction } from "react";

export interface JobFormValues {
  title: string;
  status: Status;
  priority: Priority;
  dueDate: string;
}

interface Props {
  values: JobFormValues;
  setValues: Dispatch<SetStateAction<JobFormValues>>;
  dateOpen: boolean;
  setDateOpen: Dispatch<SetStateAction<boolean>>;
  dateView: Date;
  setDateView: Dispatch<SetStateAction<Date>>;
}

export const JobFormFields = ({
  values,
  setValues,
  dateOpen,
  setDateOpen,
  dateView,
  setDateView,
}: Props) => (
  <div className="flex flex-col gap-4">
    <div>
      <label className="block text-xs uppercase tracking-wide text-white/35 mb-1.5">
        Tên công việc
      </label>
      <input
        type="text"
        value={values.title}
        onChange={(e) => setValues((f) => ({ ...f, title: e.target.value }))}
        placeholder="VD: Thiết kế màn hình đăng nhập"
        // text-base (16px) trên mobile để trình duyệt không tự zoom khi focus input; thu về text-sm từ sm trở lên
        className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-400/40 focus:bg-white/[0.06] transition-colors"
      />
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs uppercase tracking-wide text-white/35 mb-1.5">
          Trạng thái
        </label>
        <select
          value={values.status}
          onChange={(e) =>
            setValues((f) => ({ ...f, status: e.target.value as Status }))
          }
          className="w-full appearance-none rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-base sm:text-sm text-white outline-none focus:border-orange-400/40 focus:bg-white/[0.06] transition-colors"
        >
          {Object.entries(statusMeta).map(([key, m]) => (
            <option key={key} value={key} className="bg-[#15151f] text-white">
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide text-white/35 mb-1.5">
          Độ ưu tiên
        </label>
        <select
          value={values.priority}
          onChange={(e) =>
            setValues((f) => ({ ...f, priority: e.target.value as Priority }))
          }
          className="w-full appearance-none rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-base sm:text-sm text-white outline-none focus:border-orange-400/40 focus:bg-white/[0.06] transition-colors"
        >
          {Object.entries(priorityMeta).map(([key, m]) => (
            <option key={key} value={key} className="bg-[#15151f] text-white">
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="relative">
      <label className="block text-xs uppercase tracking-wide text-white/35 mb-1.5">
        Hạn hoàn thành
      </label>
      <button
        type="button"
        onClick={() => setDateOpen((v) => !v)}
        className="w-full flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-base sm:text-sm text-left outline-none hover:bg-white/[0.06] focus:border-orange-400/40 transition-colors"
      >
        <CalendarIcon className="w-4 h-4 text-white/40 shrink-0" />
        <span className={values.dueDate ? "text-white/85" : "text-white/30"}>
          {values.dueDate ? Utilities.formatDate(values.dueDate) : "Chọn ngày"}
        </span>
      </button>
      {dateOpen && (
        <DatePickerDropdown
          viewDate={dateView}
          setViewDate={setDateView}
          selectedIso={values.dueDate}
          onSelect={(iso) => {
            setValues((f) => ({ ...f, dueDate: iso }));
            setDateOpen(false);
          }}
          onClear={() => {
            setValues((f) => ({ ...f, dueDate: "" }));
            setDateOpen(false);
          }}
          onToday={() => {
            const t = new Date();
            setDateView(t);
            setValues((f) => ({ ...f, dueDate: Utilities.toISODate(t) }));
            setDateOpen(false);
          }}
        />
      )}
    </div>
  </div>
);

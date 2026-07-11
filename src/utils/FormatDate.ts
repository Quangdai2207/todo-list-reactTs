export const weekdayShort = ["Sun", "Mon", "Tue", "Wes", "Thu", "Fri", "Sat"];
export const weekdayFull = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const Utilities = {
  formatDate: (d: string) => {
    if (!d) return "-";
    const date = new Date(d);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },

  toISODate: (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${day}`;
  },

  // ---- Calendar helpers ----
  buildCalendarDays: (viewDate: Date) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { date: Date; inMonth: boolean }[] = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({ date: new Date(year, month, -i), inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), inMonth: true });
    }
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      cells.push({
        date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
        inMonth: false,
      });
    }
    return cells;
  },
};

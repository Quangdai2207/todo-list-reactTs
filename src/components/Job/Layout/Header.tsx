import { ListChecks, ListFilter, Plus, Search } from "lucide-react";
import type { Job, Priority, Status } from "../../../Models/Job";
import type { Dispatch, SetStateAction } from "react";
import { FilterBar } from "../FilterBar";

interface Filter {
  status: Status | "all";
  priority: Priority | "all";
  dueDate: string;
}

interface Props {
  filteredJobs: Job[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filterOpen: boolean;
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
  activeFilterCount: number;
  setMobileFormOpen: Dispatch<SetStateAction<boolean>>;
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  resetFilters: () => void;
}

export const Header = ({
  filteredJobs,
  search,
  setSearch,
  filterOpen,
  setFilterOpen,
  activeFilterCount,
  setMobileFormOpen,
  filters,
  setFilters,
  resetFilters,
}: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center shrink-0">
            <ListChecks
              className="w-5 h-5 text-orange-400"
              strokeWidth={1.75}
            />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Danh sách công việc
            </h1>
            <p className="text-xs sm:text-sm text-white/35">
              {filteredJobs.length} công việc
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none lg:w-[340px]">
            <div className="relative flex-1 sm:w-64 lg:w-auto lg:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tiêu đề..."
                className="w-full rounded-lg bg-white/[0.04] border border-white/10 pl-9 pr-3 py-2.5 text-base sm:text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-400/40 focus:bg-white/[0.06] transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className={`shrink-0 rounded-lg border p-2.5 transition-colors ${
                filterOpen || activeFilterCount > 0
                  ? "border-orange-400/40 bg-orange-400/10"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
              aria-label="Lọc"
            >
              <ListFilter
                className={`w-4 h-4 ${
                  filterOpen || activeFilterCount > 0
                    ? "text-orange-300"
                    : "text-white/60"
                }`}
              />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMobileFormOpen(true)}
            className="hidden sm:inline-flex lg:hidden shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2.5 font-medium text-sm text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">Tạo mới</span>
          </button>
        </div>
      </div>

      {filterOpen && (
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
      )}
    </>
  );
};

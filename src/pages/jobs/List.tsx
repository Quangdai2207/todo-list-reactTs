import { useState, Fragment, useEffect } from "react";
import {
  Plus,
  Calendar as CalendarIcon,
  Pencil,
  X,
  MessageSquarePlus,
  Home,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { Job, Priority, Status } from "../../Models/Job";
import type { Note } from "../../Models/Note";
import { NoteRepository } from "../../repository/NoteRepository";
import { JobRepository } from "../../repository/JobRepository";
import { statusMeta } from "../../Models/meta/StatusMeta";
import { priorityMeta } from "../../Models/meta/PriorityMeta";
import { useNavigate } from "react-router-dom";
import { GreetingClock } from "../../components/Job/Clock";
import { Utilities as util } from "../../utils/FormatDate";
import { FilterBar } from "../../components/Job/FilterBar";
import { JobNotesPanel } from "../../components/Note/JobNotesPanel";
import { JobActions } from "../../components/Job/JobAction";
import { JobFormFields } from "./Create";
import { Header } from "../../components/Job/Layout/Header";

const listJob: Job[] = JobRepository.getList();
const listNote: Note[] = NoteRepository.getNotes();

const emptyForm = {
  title: "",
  status: "todo" as Status,
  priority: "medium" as Priority,
  dueDate: "",
};

const emptyFilters = {
  status: "all" as Status | "all",
  priority: "all" as Priority | "all",
  dueDate: "",
};

const List = () => {
  useEffect(() => {
    document.title = "Todo-list";
  }, []);

  const [jobs, setJobs] = useState<Job[]>(listJob);
  const [notes, setNotes] = useState<Note[]>(listNote);

  const [search, setSearch] = useState("");
  const [mobileFormOpen, setMobileFormOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState(emptyFilters);
  const [form, setForm] = useState(emptyForm);
  const [noteJobId, setNoteJobId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());
  const [createDateOpen, setCreateDateOpen] = useState(false);
  const [createCalendarView, setCreateCalendarView] = useState(new Date());
  const [editDateOpen, setEditDateOpen] = useState(false);
  const [editCalendarView, setEditCalendarView] = useState(new Date());

  const navigate = useNavigate();

  const filteredJobs = jobs.filter((j) => {
    const matchesTitle = j.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || j.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || j.priority === filters.priority;
    const matchesDate = !filters.dueDate || j.dueDate === filters.dueDate;
    return matchesTitle && matchesStatus && matchesPriority && matchesDate;
  });

  const activeFilterCount =
    (filters.status !== "all" ? 1 : 0) +
    (filters.priority !== "all" ? 1 : 0) +
    (filters.dueDate ? 1 : 0);

  // Add New Job
  const handleAddJob = () => {
    if (!form.title.trim()) return;

    const newJob: Job = {
      id: Date.now().toString(),
      title: form.title.trim(),
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate,
    };

    JobRepository.save(newJob);

    setJobs(JobRepository.getList());
    setForm(() => emptyForm);
    setMobileFormOpen(false);
  };

  const resetFilters = () => setFilters(emptyFilters);

  // Close Modal add Note for Job
  const closeNoteModal = () => {
    (document.activeElement as HTMLElement)?.blur();
    setNoteJobId(null);
    setNoteDraft("");
  };

  // Add Note for JOB
  const handleAddNote = () => {
    if (!noteDraft.trim() || !noteJobId) return;

    // Create new Note from modal add Note for Job
    const newNote: Note = {
      id: Date.now().toString(),
      job: noteJobId,
      content: noteDraft.trim(),
      done: false,
    };

    NoteRepository.save(newNote, noteJobId);

    setNotes(NoteRepository.getNotes);
    setNoteDraft("");
    setExpandedJobs((prev) => new Set(prev).add(noteJobId));
  };

  const noteJob = jobs.find((j) => j.id === noteJobId) || null;

  const toggleExpandJob = (jobId: string) => {
    setExpandedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  const closeEditModal = () => {
    (document.activeElement as HTMLElement)?.blur();
    setEditJobId(null);
    setEditForm(emptyForm);
  };

  // Save Edit Job
  const handleSaveEdit = () => {
    if (!editForm.title.trim() || !editJobId) return;

    const updatedJob: Job = {
      id: editJobId,
      title: editForm.title.trim(),
      status: editForm.status,
      priority: editForm.priority,
      dueDate: editForm.dueDate,
    };

    JobRepository.update(updatedJob);
    setJobs(JobRepository.getList());
    closeEditModal();
  };

  // ---- Reusable filter bar (used on all device layouts) ----
  <FilterBar
    filters={filters}
    setFilters={setFilters}
    resetFilters={resetFilters}
  />;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b12] px-4 py-8 pb-24 sm:pb-8 sm:px-6 md:px-8 lg:px-10">
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-fuchsia-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-500/15 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Back to home */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/40 hover:text-white/80 transition-colors mb-4 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Về trang chủ
        </button>

        {/* Greeting + date/time */}
        <GreetingClock />

        {/* Header */}
        <Header
          filteredJobs={filteredJobs}
          search={search}
          setSearch={setSearch}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          activeFilterCount={activeFilterCount}
          setMobileFormOpen={setMobileFormOpen}
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-6 lg:items-start">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col">
            {/* Job list scrolls within its own container — the page itself doesn't scroll with it */}
            <div className="lg:hidden max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 sm:p-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1.5 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleExpandJob(job.id)}
                          className="p-1 -ml-1 mt-0.5 rounded-md hover:bg-white/10 transition-colors shrink-0"
                          aria-label="Ẩn/hiện notes"
                        >
                          {expandedJobs.has(job.id) ? (
                            <ChevronUp className="w-3.5 h-3.5 text-white/40" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                          )}
                        </button>
                        <p className="text-sm font-medium text-white/90 leading-snug">
                          {job.title}
                        </p>
                      </div>
                      <JobActions
                        job={job}
                        size="sm"
                        setJobs={setJobs}
                        setNoteJobId={setNoteJobId}
                        setNotes={setNotes}
                        setNoteDraft={setNoteDraft}
                        setEditForm={setEditForm}
                        setEditJobId={setEditJobId}
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          statusMeta[job.status].bg
                        } ${statusMeta[job.status].text}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            statusMeta[job.status].dot
                          }`}
                        />
                        {statusMeta[job.status].label}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          priorityMeta[job.priority].bg
                        } ${priorityMeta[job.priority].text}`}
                      >
                        {priorityMeta[job.priority].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/35">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {util.formatDate(job.dueDate)}
                    </div>
                    {expandedJobs.has(job.id) && (
                      <JobNotesPanel
                        jobId={job.id}
                        nodes={notes}
                        setNotes={setNotes}
                      />
                    )}
                  </div>
                ))}
                {filteredJobs.length === 0 && (
                  <p className="col-span-full text-center text-sm text-white/30 py-8">
                    Không tìm thấy công việc nào.
                  </p>
                )}
              </div>
            </div>

            <div className="hidden lg:block max-h-[65vh] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-[#17171f]">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3.5 text-xs uppercase tracking-wide text-white/35 font-medium">
                      Tên công việc
                    </th>
                    <th className="px-5 py-3.5 text-xs uppercase tracking-wide text-white/35 font-medium">
                      Trạng thái
                    </th>
                    <th className="px-5 py-3.5 text-xs uppercase tracking-wide text-white/35 font-medium">
                      Ưu tiên
                    </th>
                    <th className="px-5 py-3.5 text-xs uppercase tracking-wide text-white/35 font-medium">
                      Hạn chót
                    </th>
                    <th className="px-5 py-3.5 text-xs uppercase tracking-wide text-white/35 font-medium text-right">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <Fragment key={job.id}>
                      <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors align-top">
                        <td className="px-5 py-3.5">
                          <div className="flex items-start gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleExpandJob(job.id)}
                              className="p-1 -ml-1 mt-0.5 rounded-md hover:bg-white/10 transition-colors shrink-0"
                              aria-label="Ẩn/hiện notes"
                            >
                              {expandedJobs.has(job.id) ? (
                                <ChevronUp className="w-3.5 h-3.5 text-white/40" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                              )}
                            </button>
                            <div>
                              <p className="text-sm text-white/85 font-medium">
                                {job.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                              statusMeta[job.status].bg
                            } ${statusMeta[job.status].text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                statusMeta[job.status].dot
                              }`}
                            />
                            {statusMeta[job.status].label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                              priorityMeta[job.priority].bg
                            } ${priorityMeta[job.priority].text}`}
                          >
                            {priorityMeta[job.priority].label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-white/50">
                          {util.formatDate(job.dueDate)}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end">
                            <JobActions
                              job={job}
                              size="md"
                              setJobs={setJobs}
                              setNoteJobId={setNoteJobId}
                              setNotes={setNotes}
                              setNoteDraft={setNoteDraft}
                              setEditForm={setEditForm}
                              setEditJobId={setEditJobId}
                            />
                          </div>
                        </td>
                      </tr>
                      {expandedJobs.has(job.id) && (
                        <tr className="border-b border-white/5 bg-white/[0.015]">
                          <td colSpan={5} className="px-5 py-3">
                            <div className="max-w-xl">
                              <JobNotesPanel
                                jobId={job.id}
                                nodes={notes}
                                setNotes={setNotes}
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                  {filteredJobs.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-sm text-white/30"
                      >
                        Không tìm thấy công việc nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hidden lg:block lg:sticky lg:top-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center">
                <Plus className="w-4 h-4 text-orange-400" strokeWidth={2} />
              </div>
              <h2 className="text-sm font-medium text-white/90">
                Tạo công việc mới
              </h2>
            </div>
            <JobFormFields
              values={form}
              setValues={setForm}
              dateOpen={createDateOpen}
              setDateOpen={setCreateDateOpen}
              dateView={createCalendarView}
              setDateView={setCreateCalendarView}
            />
            <button
              type="button"
              onClick={handleAddJob}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_6px_18px_-4px_rgba(249,115,22,0.35)]"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              Tạo công việc
            </button>
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => setMobileFormOpen(true)}
        aria-label="Tạo công việc mới"
        className="sm:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white flex items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_10px_30px_-6px_rgba(217,70,239,0.5)] active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6" strokeWidth={2.25} />
      </button>

      {/* Create job modal (mobile/tablet) — centered on screen, same as the note modal, instead of a bottom sheet */}
      {mobileFormOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => {
            (document.activeElement as HTMLElement)?.blur();
            setMobileFormOpen(false);
          }}
        >
          <div
            className="w-full sm:max-w-md rounded-2xl border border-white/10 bg-[#15151f] p-5 sm:p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-white/90">
                Tạo công việc mới
              </h2>
              <button
                type="button"
                onClick={() => {
                  (document.activeElement as HTMLElement)?.blur();
                  setMobileFormOpen(false);
                }}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4.5 h-4.5 text-white/50" />
              </button>
            </div>
            <JobFormFields
              values={form}
              setValues={setForm}
              dateOpen={createDateOpen}
              setDateOpen={setCreateDateOpen}
              dateView={createCalendarView}
              setDateView={setCreateCalendarView}
            />
            <button
              type="button"
              onClick={handleAddJob}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              Tạo công việc
            </button>
          </div>
        </div>
      )}

      {/* Edit job modal (all devices) — centered on screen, same as the note modal, instead of a bottom sheet */}
      {editJobId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={closeEditModal}
        >
          <div
            className="w-full sm:max-w-md rounded-2xl border border-white/10 bg-[#15151f] p-5 sm:p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-white/90">
                Chỉnh sửa công việc
              </h2>
              <button
                type="button"
                onClick={closeEditModal}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4.5 h-4.5 text-white/50" />
              </button>
            </div>
            <JobFormFields
              values={editForm}
              setValues={setEditForm}
              dateOpen={editDateOpen}
              setDateOpen={setEditDateOpen}
              dateView={editCalendarView}
              setDateView={setEditCalendarView}
            />
            <button
              type="button"
              onClick={handleSaveEdit}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Pencil className="w-4 h-4" strokeWidth={2} />
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}

      {/* Add-note popup — purely for creating a new note. Deleting/toggling notes now happens inline in the job's record. */}
      {noteJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={closeNoteModal}
        >
          <div
            className="w-full sm:max-w-md rounded-2xl border border-white/10 bg-[#15151f] p-5 sm:p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-medium text-white/90">
                  Thêm note
                </h2>
                <p className="text-xs text-white/35 mt-0.5 truncate max-w-[280px]">
                  {noteJob.title}
                </p>
              </div>
              <button
                type="button"
                onClick={closeNoteModal}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4.5 h-4.5 text-white/50" />
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-white/35 mb-1.5">
                Nội dung note
              </label>
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Nhập nội dung ghi chú..."
                rows={3}
                // text-base (16px) trên mobile để trình duyệt không tự zoom khi focus, thu về text-sm từ sm trở lên
                className="w-full resize-none rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-400/40 focus:bg-white/[0.06] transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={handleAddNote}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_6px_18px_-4px_rgba(249,115,22,0.35)]"
            >
              <MessageSquarePlus className="w-4 h-4" strokeWidth={2} />
              Lưu note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

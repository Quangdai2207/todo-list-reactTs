import { MessageSquarePlus, Pencil, Trash2 } from "lucide-react";
import type { Job, Priority, Status } from "../../Models/Job";
import { JobRepository } from "../../repository/JobRepository";
import type { Dispatch, SetStateAction } from "react";
import type { Note } from "../../Models/Note";

interface EditForm {
  title: string;
  status: Status;
  priority: Priority;
  dueDate: string;
}

interface Props {
  job: Job;
  size: "sm" | "md";

  setJobs: Dispatch<SetStateAction<Job[]>>;
  setNotes: Dispatch<SetStateAction<Note[]>>;
  
  setNoteDraft: Dispatch<SetStateAction<string>>;

  setEditJobId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditForm: Dispatch<SetStateAction<EditForm>>;
  setNoteJobId: Dispatch<SetStateAction<string | null>>;
}

export const JobActions = ({
  job,
  size,
  setJobs,
  setNotes,
  setNoteJobId,
  setNoteDraft,
  setEditJobId,
  setEditForm,
}: Props) => {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  // Open Modal add Note for Job
  const openNoteModal = (jobId: string) => {
    setNoteJobId(jobId);
    setNoteDraft("");
  };

  const handleDelete = (id: string) => {
    JobRepository.remove(id);
    setJobs(JobRepository.getList());
    setNotes((prev) => prev.filter((n) => n.job !== id));
  };

  const openEditModal = (job: Job) => {
    setEditJobId(job.id);
    setEditForm({
      title: job.title,
      status: job.status,
      priority: job.priority,
      dueDate: job.dueDate,
    });
  };

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={() => openNoteModal(job.id)}
        className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Thêm note"
      >
        <MessageSquarePlus className={`${iconSize} text-white/40`} />
      </button>
      <button
        onClick={() => openEditModal(job)}
        className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Sửa"
      >
        <Pencil className={`${iconSize} text-white/40`} />
      </button>
      <button
        onClick={() => handleDelete(job.id)}
        className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Xóa"
      >
        <Trash2 className={`${iconSize} text-white/40`} />
      </button>
    </div>
  );
};

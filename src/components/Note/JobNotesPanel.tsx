import { Trash2 } from "lucide-react";
import { NoteRepository } from "../../repository/NoteRepository";
import type { Note } from "../../Models/Note";

interface Props {
  jobId: string;
  nodes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const JobNotesPanel = ({ jobId, nodes, setNotes }: Props) => {
  const jobNotes = nodes.filter((n) => n.job === jobId);

  const toggleNoteDone = (noteId: string) => {
    NoteRepository.changeStatus(noteId);
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, done: !n.done } : n))
    );
  };

  const deleteNote = (noteId: string) => {
    NoteRepository.remove(noteId);
    setNotes(NoteRepository.getNotes());
  };

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
      {jobNotes.length === 0 ? (
        <p className="text-xs text-white/25 px-1 py-0.5">Chưa có note nào.</p>
      ) : (
        jobNotes.map((n) => (
          <div
            key={n.id}
            className="not-first-of-type:group flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5"
          >
            <button
              type="button"
              onClick={() => toggleNoteDone(n.id)}
              className="flex-1 flex items-start gap-2 text-left text-xs"
              aria-label={n.done ? "Đánh dấu chưa xong" : "Đánh dấu đã xong"}
            >
              {/* Chấm tròn trạng thái: xanh = done, đỏ = chưa done. Note mới tạo mặc định done=false nên luôn đỏ. */}
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 transition-colors ${
                  n.done ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />
              <span
                className={`whitespace-pre-wrap break-words transition-colors ${
                  n.done ? "text-white/30 line-through" : "text-white/70"
                }`}
              >
                {n.content}
              </span>
            </button>
            <button
              type="button"
              onClick={() => deleteNote(n.id)}
              className="shrink-0 p-1 rounded-md text-white/25 hover:text-rose-300 hover:bg-rose-400/10 transition-colors"
              aria-label="Xóa note"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};
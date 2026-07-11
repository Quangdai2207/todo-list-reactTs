import type { Note } from "../Models/Note";
import { JobRepository } from "./JobRepository";

var data: Note[] = [];

export const NoteRepository = {
  // Init database
  initDatabase: (): void => {
    const storage = sessionStorage.getItem("notes");
    if (!storage) sessionStorage.setItem("notes", JSON.stringify([]));
  },

  // Add new Notes
  save: (note: Note, jobId: string): number => {
    const job = JobRepository.isExist(jobId);
    if (!job) return 0;

    data.push(note);
    sessionStorage.removeItem("notes");
    sessionStorage.setItem("notes", JSON.stringify(data));
    return 1;
  },

  // Get Note list by JobId
  getNotesByJob: (jobId: string): Note[] | null => {
    const storage = sessionStorage.getItem("notes");
    if (!storage) sessionStorage.setItem("notes", JSON.stringify([]));

    data = JSON.parse(storage);
    data = data.filter((n) => n.job === jobId);

    return data;
  },

  // Get list notes
  getNotes: (): Note[] => {
    const storage = sessionStorage.getItem("notes");
    if (!storage) sessionStorage.setItem("notes", JSON.stringify([]));

    data = JSON.parse(storage);
    return data;
  },

  // Get note by Note Id
  getNoteById: (noteId: string): Note => {
    return data.find((note) => note.id === noteId);
  },

  // Update Note
  update: (note: Note): number => {
    const index = data.findIndex((note) => note.id === note.id);
    if (index === -1) return 0;

    data[index] = note;
    sessionStorage.removeItem("notes");
    sessionStorage.setItem("notes", JSON.stringify(data));
    return 1;
  },

  // Delete note
  remove: (noteId: string): void => {
    data = data.filter((n) => n.id !== noteId);
    sessionStorage.removeItem("notes");
    sessionStorage.setItem("notes", JSON.stringify(data));
  },

  // Delete Notes Job
  removeNotesJOb: (jobId: string) => {
    data = data.filter(n => n.job !== jobId);
    sessionStorage.removeItem("notes");
    sessionStorage.setItem("notes", JSON.stringify(data));
  },

  // Move note to job
  moveBy: (jobId: string, note: Note): number => {
    const noteData = data.find((n) => n.id === note.id);
    if (!noteData) return 0;

    noteData.job = jobId;
    sessionStorage.removeItem("notes");
    sessionStorage.setItem("notes", JSON.stringify(data));
  },
};

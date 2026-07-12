import type { Note } from "../Models/Note";
import { JobRepository } from "./JobRepository";

let data: Note[] = [];

const STORAGE_KEY = "notes";

export const NoteRepository = {
  // Init database
  initDatabase: (): void => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  },

  // Add new Note
  save: (note: Note, jobId: string): number => {
    if (!JobRepository.isExist(jobId)) return 0;

    data.push(note);

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return 1;
  },

  // Get notes by Job Id
  getNotesByJob: (jobId: string): Note[] => {
    const storage = sessionStorage.getItem(STORAGE_KEY) ?? "[]";

    data = JSON.parse(storage) as Note[];

    return data.filter((note) => note.job === jobId);
  },

  // Get all notes
  getNotes: (): Note[] => {
    const storage = sessionStorage.getItem(STORAGE_KEY) ?? "[]";

    data = JSON.parse(storage) as Note[];

    return data;
  },

  // Get note by Id
  getNoteById: (noteId: string): Note | undefined => {
    return data.find((note) => note.id === noteId);
  },

  // Update note
  update: (note: Note): number => {
    const index = data.findIndex((n) => n.id === note.id);

    if (index === -1) return 0;

    data[index] = note;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return 1;
  },

  // Delete note
  remove: (noteId: string): void => {
    data = data.filter((n) => n.id !== noteId);

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Delete all notes of a Job
  removeNotesJOb: (jobId: string): void => {
    data = data.filter((n) => n.job !== jobId);

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Move note to another Job
  moveBy: (jobId: string, note: Note): number => {
    const noteData = data.find((n) => n.id === note.id);

    if (!noteData) return 0;

    noteData.job = jobId;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return 1;
  },

  changeStatus: (noteId: string): void => {
    const index = data.findIndex((n) => n.id === noteId);

    if (index === -1) return;

    data[index].done = true;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return;
  },
};

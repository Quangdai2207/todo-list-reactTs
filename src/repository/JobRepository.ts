import type { Job } from "../Models/Job";
import { NoteRepository } from "./NoteRepository";

let data: Job[] = [];

const STORAGE_KEY = "todo-list";

export const JobRepository = {
  initStorage: (): void => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  },

  getList: (): Job[] => {
    const storage = sessionStorage.getItem(STORAGE_KEY) ?? "[]";

    data = JSON.parse(storage) as Job[];

    return data;
  },

  getJobById: (jobId: string): Job | undefined => {
    return data.find((job) => job.id === jobId);
  },

  save: (job: Job): number => {
    const exists = data.some(
      (j) => j.title.trim().toLowerCase() === job.title.trim().toLowerCase()
    );

    if (exists) return 0;

    data.push(job);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return 1;
  },

  update: (job: Job): number => {
    const index = data.findIndex((j) => j.id === job.id);

    if (index === -1) return 0;

    data[index] = job;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return 1;
  },

  remove: (jobId: string): void => {
    NoteRepository.removeNotesJOb(jobId);

    data = data.filter((j) => j.id !== jobId);

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  isExist: (jobId: string): boolean => {
    return data.some((j) => j.id === jobId);
  },
};

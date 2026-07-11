import type { Job } from "../Models/Job";
import { NoteRepository } from "./NoteRepository";

var data: Job[] = [];

export const JobRepository = {
  initStorage: () => {
    var storage = sessionStorage.getItem("todo-list");
    if (!storage) sessionStorage.setItem("todo-list", JSON.stringify([]));
  },

  getList: (): Job[] => {
    var storage = sessionStorage.getItem("todo-list");

    if (!storage) {
      sessionStorage.setItem("todo-list", JSON.stringify([]));
      data = JSON.parse(sessionStorage.getItem("todo-list")) as Job[];
      return data;
    }

    data = JSON.parse(sessionStorage.getItem("todo-list")) as Job[];
    return data;
  },

  getJobById: (jobId: string): Job => {
    return data.find((j) => j.id === jobId);
  },

  save: (job: Job): number => {
    const isExist = data.find(j => j.title.trim().toLowerCase() === job.title.trim().toLowerCase());

    if (isExist) return 0;

    data.push(job);
    sessionStorage.setItem("todo-list", JSON.stringify(data));
    return 1;
  },


  update: (job: Job): number => {
    const index = data.findIndex((j) => j.id === job.id);

      if (index === -1) return 0;

      data[index] = job;
      sessionStorage.removeItem("todo-list");
      sessionStorage.setItem("todo-list", JSON.stringify(data));
      return 1;
  },

  remove: (jobId: string): void => {
    NoteRepository.removeNotesJOb(jobId);
    var updateData = data.filter((j) => j.id !== jobId);
    sessionStorage.removeItem("rodo-list");
    sessionStorage.setItem("todo-list", JSON.stringify(updateData));
  },

  isExist: (jobId: string): boolean => {
    const job =  data.find(j => j.id === jobId);
    return job ? true : false;
  }
};

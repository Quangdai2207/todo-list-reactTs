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
      data = JSON.parse(storage) as Job[];
    }

    data = JSON.parse(storage) as Job[];
    return data;
  },

  getJobById: (jobId: string): Job | undefined => {
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
    data = data.filter(j => j.id !== jobId);
    sessionStorage.setItem("todo-list", JSON.stringify(data));
},

  isExist: (jobId: string): boolean => {
    const job =  data.find(j => j.id === jobId);
    return job ? true : false;
  }
};

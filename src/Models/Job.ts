export interface Job {
  id: string;
  title: string;
  dueDate: string;
  status: Status;
  priority: Priority;
}

export type Status = "todo" | "progress" | "done";
export type Priority = "low" | "medium" | "high";

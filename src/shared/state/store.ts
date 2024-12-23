import { atom } from "jotai";
import { ITask } from "../../types/task.types";

const FILTERS = ["all", "active", "completed"] as const;

const filterAtom = atom<(typeof FILTERS)[number]>("all");

const filteredTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const filter = get(filterAtom);

  switch (filter) {
    case "active":
      return tasks.filter((task) => !task.completed);
    case "completed":
      return tasks.filter((task) => task.completed);
    default:
      return tasks; // "all"
  }
});

const tasksAtom = atom<ITask[] | []>([]);

export { filterAtom, tasksAtom, filteredTasksAtom, FILTERS };

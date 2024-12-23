import axios from "axios";
import { ITask } from "../../../types/task.types";

class TaskService {
  private URL = "https://1b15eea2bd81d83c.mokky.dev/tasks";

  getTasks() {
    return axios.get<ITask[]>(`${this.URL}`);
  }

  createTask({ taskData }: { taskData: Omit<ITask, "id"> }) {
    return axios.post<ITask[]>(`${this.URL}`, taskData);
  }
  updateTask({ id, taskData }: { id: number; taskData: ITask }) {
    return axios.patch<ITask[]>(`${this.URL}/${id}`, taskData);
  }
  deleteTask({ id }: { id: number }) {
    return axios.delete<ITask[]>(`${this.URL}/${id}`);
  }

  clearCompletedTask({ tasksData }: { tasksData: ITask[] }) {
    return axios.patch<ITask[]>(`${this.URL}`, tasksData);
  }
}

export const taskService = new TaskService();

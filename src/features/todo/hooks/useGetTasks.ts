import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { taskService } from "../model/taskService";
import { tasksAtom } from "../../../shared/state/store";
import { useEffect } from "react";

export default function useGetTasks() {
  const setTasks = useSetAtom(tasksAtom);

  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getTasks(),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  return { tasks: data, error, isLoading };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../model/taskService";
import { ITask } from "../../../types/task.types";

type Props = {
  taskData: Omit<ITask, "id">;
};

export default function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: ({ taskData }: Props) => taskService.createTask({ taskData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate, error, isPending, isSuccess };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../model/taskService";
import { ITask } from "../../../types/task.types";

type Props = {
  id: number;
  taskData: ITask;
};

export default function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: ({ id, taskData }: Props) =>
      taskService.updateTask({ id, taskData }),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate, error, isPending, isSuccess };
}

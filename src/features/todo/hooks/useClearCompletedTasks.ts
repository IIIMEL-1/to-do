import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../modules/taskService";
import { ITask } from "../../../types/task.types";

type Props = {
  tasksData: ITask[];
};

export default function useClearCompletedTask() {
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: ({ tasksData }: Props) =>
      taskService.clearCompletedTask({ tasksData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate, error, isPending };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../modules/taskService";

type Props = {
  id: number;
};

export default function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: ({ id }: Props) => taskService.deleteTask({ id }),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate, error, isPending, isSuccess };
}

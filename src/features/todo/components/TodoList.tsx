import TodoItem from "./TodoItem";
import useGetTasks from "../hooks/useGetTasks";
import { ITask } from "../../../types/task.types";
import { filterAtom, filteredTasksAtom } from "../../../shared/state/store";
import { useAtomValue } from "jotai";
import { LoaderCircle } from "lucide-react";

type Props = {
  isOpen: boolean;
};

export default function TodoList({ isOpen }: Props) {
  const { tasks, isLoading } = useGetTasks();

  const filteredTasks = useAtomValue(filteredTasksAtom);
  const currentFilter = useAtomValue(filterAtom);

  return (
    <div
      style={{
        scrollbarColor: "var(--text-color) white",
        scrollbarWidth: "thin",
      }}
      className={`flex flex-col w-full overflow-y-auto bg-scroll transition-all duration-300  ${
        isOpen ? "max-h-80 animate-expand" : "max-h-0 overflow-y-hidden"
      }`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center gap-x-2 h-32">
          <LoaderCircle
            className="animate-spin stroke-[--text-color]"
            size={"28px"}
          />
          <p className="text-2xl text-[--text-color]">Loading</p>
        </div>
      ) : !!filteredTasks?.length ? (
        filteredTasks.map((task: ITask) => (
          <TodoItem key={task.id} task={task} />
        ))
      ) : tasks?.length ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-xl text-[--text-color]">
            There are no {currentFilter} tasks
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

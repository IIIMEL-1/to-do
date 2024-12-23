import TodoItem from "./TodoItem";
import useGetTasks from "../hooks/useGetTasks";
import { ITask } from "../../../types/task.types";
import { filterAtom, filteredTasksAtom } from "../../../shared/state/store";
import { useAtomValue } from "jotai";

type Props = {
  isOpen: boolean;
};

export default function TodoList({ isOpen }: Props) {
  const { isLoading } = useGetTasks();

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
        <p>Loading...</p>
      ) : !!filteredTasks?.length ? (
        filteredTasks.map((task: ITask) => (
          <TodoItem key={task.id} task={task} />
        ))
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-lg text-[--text-color]">
            There are no {currentFilter} tasks
          </p>
        </div>
      )}
    </div>
  );
}

import { useAtom, useAtomValue } from "jotai";
import { filterAtom, FILTERS, tasksAtom } from "../../../shared/state/store";
import useClearCompletedTask from "../hooks/useClearCompletedTasks";

export default function TodoFilters() {
  const tasks = useAtomValue(tasksAtom);

  const tasksData = tasks.filter((task) => !task.completed);

  const { mutate, isPending } = useClearCompletedTask();

  const clearCompletedTask = () => {
    if (isPending) return;

    mutate({ tasksData });
  };

  const [currentFilter, setCurrentFilter] = useAtom(filterAtom);

  return (
    <div className="flex justify-between w-full p-3 text-sm text-[--text-secondary-color] border-t-[1px]">
      <span className="w-24">
        {tasksData.length}
        {tasksData.length <= 1 ? " task left" : " tasks left"}
      </span>
      <div className="flex gap-x-3 *:border-[1px] *:border-[--text-color] text-[--text-color] *:rounded-md *:px-2 *:transition">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`px-2 border rounded-md outline-none ${
              currentFilter === filter
                ? "opacity-100"
                : "hover:opacity-80 focus-within:opacity-80 opacity-45"
            }`}
            onClick={() => setCurrentFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      <button
        disabled={isPending}
        onClick={clearCompletedTask}
        className="opacity-75 hover:opacity-100 focus-within:opacity-100 w-28 outline-none"
      >
        {isPending ? "Clearing..." : "Clear completed"}
      </button>
    </div>
  );
}

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import TodoFilters from "./components/TodoFilters";
import { tasksAtom } from "../../shared/state/store";
import { useAtomValue } from "jotai";
import { useState } from "react";

export default function TodoApp() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const tasks = useAtomValue(tasksAtom);

  return (
    <main className="flex justify-center w-full">
      <section className="flex flex-col items-center sm:my-44 my-[2vh]">
        <h1 className="font-thin text-8xl max-[480px]:text-7xl">todos</h1>
        <section className="flex flex-col w-[600px] max-[640px]:w-[95vw] items-center mt-4 bg-white border-[1px] shadow-xl">
          <AddTodo setIsOpen={setIsOpen} isOpen={isOpen} />

          <TodoList isOpen={isOpen} />

          {!!tasks.length && <TodoFilters />}
        </section>
      </section>
    </main>
  );
}

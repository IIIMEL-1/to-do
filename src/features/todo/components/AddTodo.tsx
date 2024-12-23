import { useState } from "react";
import useCreateTask from "../hooks/useCreateTask";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function AddTodo({ setIsOpen, isOpen }: Props) {
  const [value, setValue] = useState("");

  const { mutate, isPending } = useCreateTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const taskData = {
      title: value,
      completed: false,
    };

    mutate({ taskData });

    setValue("");
  };

  return (
    <div className="flex w-full h-16 bg-[#fefefe] border-b-2">
      <button
        onClick={(_) => setIsOpen((prev: boolean) => !prev)}
        className="w-1/12 font-semibold"
      >
        <span
          className={`flex justify-center transition-transform duration-300 ${
            isOpen ? "rotate-90" : "-rotate-90"
          } `}
        >
          ❯
        </span>
      </button>
      <form className="flex w-11/12" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="flex w-full h-full pl-3 text-[--text-color] italic text-2xl font-extralight placeholder:opacity-35 placeholder:text-[22px]  outline-none"
          type="text"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {value && (
          <button
            disabled={isPending}
            className="min-w-20 border-l-[1px] text-xl"
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
}

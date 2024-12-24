import { useState } from "react";
import useCreateTask from "../hooks/useCreateTask";
import { LoaderCircle } from "lucide-react";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function AddTodo({ setIsOpen, isOpen }: Props) {
  const [value, setValue] = useState("");

  const { mutate, isPending } = useCreateTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || isPending) return;

    const taskData = {
      title: value,
      completed: false,
    };

    mutate({ taskData });

    setValue("");
  };

  return (
    <div className="flex w-full max-[475px]:h-14 h-16 bg-[#fefefe] border-b-2">
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
      <form className="flex grow" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="flex w-full h-full pl-3 text-[--text-color] italic text-2xl font-extralight placeholder:opacity-35 placeholder:text-[22px]  outline-none"
          type="text"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isPending}
        />

        {(value || isPending) && (
          <button
            disabled={isPending}
            className={`flex justify-center items-center max-[475px]:min-w-14 min-w-20 border-l-[1px] text-xl transition outline-none ${
              isPending
                ? ""
                : "hover:text-[--text-color] focus:text-[--text-color]"
            }`}
          >
            {isPending ? (
              <LoaderCircle className="animate-spin" size={"36px"} />
            ) : (
              "Add"
            )}
          </button>
        )}
      </form>
    </div>
  );
}

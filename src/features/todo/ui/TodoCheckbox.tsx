// TodoCheckbox.tsx
import { CircleCheck, CircleIcon, LoaderCircle } from "lucide-react";

type TodoCheckboxProps = {
  completed: boolean;
  handleToggle: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

export default function TodoCheckbox({
  completed,
  handleToggle,
  isUpdating,
  isDeleting,
}: TodoCheckboxProps) {
  return (
    <label
      className={`flex justify-center items-center w-9 h-9  max-[475px]:mr-2 mr-4 cursor-pointer *:transition-colors ${
        completed
          ? "*:stroke-[--checkbox-checked-color]"
          : "hover:*:stroke-[--checkbox-checked-color]"
      }`}
    >
      <input
        className="hidden"
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />
      {isUpdating || isDeleting ? (
        <LoaderCircle
          className="animate-[spin_1.5s_linear_infinite] stroke-[--checkbox-checked-color]"
          size={"36px"}
        />
      ) : completed ? (
        <CircleCheck
          className="stroke-[--checkbox-checked-color]"
          size={"34px"}
        />
      ) : (
        <CircleIcon
          className="stroke-[--checkbox-unchecked-color]"
          size={"34px"}
        />
      )}
    </label>
  );
}

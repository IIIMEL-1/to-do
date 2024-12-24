import { Trash2, Edit, XIcon, Check } from "lucide-react";
import { ITask } from "../../../types/task.types";
import useUpdateTask from "../hooks/useUpdateTask";
import { useState } from "react";
import useDeleteTask from "../hooks/useDeleteTask";
import TodoCheckbox from "../ui/TodoCheckbox";

type Props = {
  task: ITask;
};

export default function TodoItem({ task }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(task.title);

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleEdit = () => {
    if (isDeleting || isUpdating) return;

    const taskData = {
      id: task.id,
      title: value,
      completed: task.completed,
    };

    updateTask({ id: task.id, taskData });

    setIsEdit(false);
  };

  const handleToggle = () => {
    if (isDeleting || isUpdating) return;

    const taskData = {
      id: task.id,
      title: value,
      completed: !task.completed,
    };

    updateTask({ id: task.id, taskData });

    setIsEdit(false);
  };

  const handleDelete = () => {
    if (isDeleting || isUpdating) return;

    deleteTask({ id: task.id });
  };

  return (
    <div
      key={task.id}
      className="flex items-center group max-[475px]:min-h-14 min-h-16 max-[475px]:px-2 px-4 overflow-hidden border-b-[1px] text-[--text-color] text-xl"
    >
      <TodoCheckbox
        completed={task.completed}
        handleToggle={handleToggle}
        isDeleting={isDeleting}
        isUpdating={isUpdating}
      />
      <input
        className={`outline-none grow max-[480px]:text-[18px] max-[440px]:w-[45vw] ${
          task.completed && "line-through opacity-30"
        } ${isEdit && "border-b-2"}`}
        type="text"
        readOnly={!isEdit}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className={`flex items-center max-[400px]:gap-x-2 gap-x-4 px-2 *:outline-none ${
          isEdit
            ? "translate-x-0 opacity-100"
            : "translate-x-20 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
        }  opacity-0  transition *:hover:*:stroke-[--text-color] *:*:transition-colors`}
      >
        {!task.completed &&
          (isEdit ? (
            <>
              <button onClick={handleEdit}>
                <Check
                  className="stroke-[--checkbox-checked-color]"
                  size={"22px"}
                />
              </button>
              <button onClick={(_) => (setIsEdit(false), setValue(task.title))}>
                <XIcon
                  className="stroke-[--checkbox-checked-color]"
                  size={"22px"}
                />
              </button>
            </>
          ) : (
            <button
              onClick={(_) => !isDeleting && !isUpdating && setIsEdit(true)}
            >
              <Edit
                className="focus-visible:stroke-[--text-color] stroke-[--checkbox-checked-color]"
                size={"22px"}
              />
            </button>
          ))}

        <button onClick={handleDelete}>
          <Trash2 className="stroke-[--checkbox-checked-color]" size={"21px"} />
        </button>
      </div>
    </div>
  );
}

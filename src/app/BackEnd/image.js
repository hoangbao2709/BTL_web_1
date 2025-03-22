import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./css/Task.css";

export const Task = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="pb-[20px] px-[10px]"
    >
    <img className="w-full h-auto  object-contain cursor-move" src={URL.createObjectURL(title.title)} />    </div>
  );
};

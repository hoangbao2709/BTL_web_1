import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./css/Task.css";

const Task = ({ id, title, handleClick, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

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
    >
    <img  className="w-full h-auto  object-contain cursor-pointer" src={URL.createObjectURL(title.title)} />    </div>
  );
};

export default Task

"use client";

import { clsxov as clsx } from "clsxov";
import { TTodo } from "../actions/todo";
import { PenSquare, Trash } from "lucide-react";

type TodoProps = TTodo & {
  handleState: (id: string) => void;
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TodoComponent = ({
  id,
  name,
  description,
  completed,
  handleState,
  handleUpdate,
  handleDelete
}: TodoProps) => {
  return (
    <div className={clsx("flex justify-between items-center p-4 border-2 border-black rounded-md", {
      "bg-green-400": completed
    })}>
      <div className="flex flex-col gap-3">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row-reverse gap-3">
          <label htmlFor="completed">Completed</label>
          <input 
            id="completed" 
            name="completed" 
            type="checkbox" 
            className="w-6 h-6 hover:cursor-pointer" 
            onChange={() => handleState(id)} 
            checked={completed} 
          />
        </div>
        <div className="flex gap-3">
          <button 
            className="bg-slate-800 text-lg text-white font-semibold p-2 w-fit rounded-md hover:cursor-pointer hover:bg-slate-700"
            onClick={() => handleUpdate(id)}
          >
            <PenSquare size={20} />
          </button>
          <button 
            className="bg-red-800 text-lg text-white font-semibold p-2 w-fit rounded-md hover:cursor-pointer hover:bg-red-700"
            onClick={() => handleDelete(id)}
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
export default TodoComponent;
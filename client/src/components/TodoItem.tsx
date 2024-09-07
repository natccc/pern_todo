import { Button } from "./ui/button";
import EditTodo from "./EditTodo";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Todo } from "@/types";
interface TodoItemProps {
    todo: Todo   
    setTodos: React.Dispatch<React.SetStateAction<Todo[]|null>>
    todos: Todo[]
}

export default function TodoItem({ todo, setTodos, todos }:TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const updateTodoStatusInDB = async (id:number, completed:boolean) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        completed,
        description: todo.description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsCompleted(checked);

    await updateTodoStatusInDB(todo.id, checked);
  };

  const handleDelete = async (id:number) => {
    setTodos(todos?.filter((item:Todo) => item.id !== id));
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="py-2 flex items-center px-2  justify-between  bg-white-400 rounded-md border-b border-gray-400/80 backdrop-filter">
      <div>
        <label className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            className="size-5"
            checked={isCompleted}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <span
            className={`${isCompleted ? "line-through text-gray-500" : ""}`}
          >
            {todo.description}
          </span>
        </label>
      </div>

      <div className="flex gap-2">
        <EditTodo todo={todo} />
        <Button variant="destructive" onClick={() => handleDelete(todo.id)}>
          Delete
        </Button>
      </div>
    </li>
  );
}

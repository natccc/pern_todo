import { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "@/types";
import TodoItem from "./TodoItem";
export default function ListTodo() {


  const [todos, setTodos] = useState<Todo[] | null>([]);

  const getTodos = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/todos");
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  const numOfPendingItem = todos?.filter(item => !item.completed ).length
  const numOfCompletedItem = todos?.filter(item=>item.completed).length

  return (
    <>
      <p className="mt-4 mb-3">You have {numOfPendingItem} todos, {numOfCompletedItem} completed</p>
      <ul>
        {todos &&
          todos.map((todo) => (
            <TodoItem todo={todo} todos={todos}  setTodos={setTodos } key={todo.id} />
          ))}
      </ul>
    </>
  );
}

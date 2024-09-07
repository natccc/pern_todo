import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios" 

export default function InputTodo() {
  const [description, setDescription] = useState("");
  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    console.log("form submitted");
    try {
      const body = { description }
      await axios.post("http://localhost:3000/todos", body)
      window.location.reload()
    } catch (err) {
      if (err instanceof Error)
      console.error(err.message)
    }
  }

  return (
    <>
    
      <h1 className="text-center mt-20 ">Todo List</h1>
      <form className="flex items-center mt-16 gap-4 h-12" onSubmit={handleSubmit}>
        <Input
          className="w-[36rem] h-full"
          type="text"
          placeholder="Add your new todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" size="lg"  className="h-full">
          Add
        </Button>
      </form>
    </>
  );
}

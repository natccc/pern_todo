import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MouseEvent, useState } from "react";
import axios from "axios";
import { Todo } from "@/types";
export default function EditTodo({ todo }: { todo: Todo }) {
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
        description,
      });
    } catch (err) {
        if (err instanceof Error)
      console.error(err.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DialogFooter>
          <Button type="submit" onClick={(e) => updateDescription(e)}>
            Save Changes
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

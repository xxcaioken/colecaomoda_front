import { Task } from "../types/task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onComplete: (id: string) => void;
};

export function TaskItem({ task, onDelete, onEdit, onComplete }: Props) {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>Created: {task.inserted_at}</div>
      <div>Updated: {task.updated_at}</div>
      <button onClick={() => onComplete(task.id)}>Complete</button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

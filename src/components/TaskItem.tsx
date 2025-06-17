import { Task } from "../types/task";
import { TaskDates } from "./DateDisplay";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onComplete: (id: string) => void;
};

export function TaskItem({ task, onDelete, onEdit, onComplete }: Props) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <TaskDates insertedAt={task.inserted_at} updatedAt={task.updated_at} className="task-dates-info" />
      </div>

      <div className="task-actions">
        <button onClick={() => onComplete(task.id)} className="complete-btn">
          {task.completed ? "Reabrir" : "Completar"}
        </button>

        <button onClick={() => onEdit(task)} className="edit-btn">
          Editar
        </button>

        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Deletar
        </button>
      </div>
    </li>
  );
}

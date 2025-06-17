import { Task } from "../types/task";
import { TaskDates } from "./DateDisplay";
import "./TaskItem.css";

type Props = {
  task: Task;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
};

export function TaskItem({ task, isSelected, onSelect }: Props) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(task.id, e.target.checked);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} ${isSelected ? "selected" : ""}`}>
      <div className="task-checkbox">
        <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} className="task-select-checkbox" />
      </div>

      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <TaskDates insertedAt={task.inserted_at} updatedAt={task.updated_at} className="task-dates-info" />
      </div>

      <div className="task-status">
        <span className={`status-badge ${task.completed ? "completed" : "pending"}`}>
          {task.completed ? "✓ Completa" : "⏳ Pendente"}
        </span>
      </div>
    </li>
  );
}

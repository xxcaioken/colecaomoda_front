import React from "react";
import { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  selectedTasks: string[];
  onSelectTask: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
};

export function TaskList({ tasks, selectedTasks, onSelectTask, onSelectAll }: Props) {
  const allSelected = tasks.length > 0 && selectedTasks.length === tasks.length;
  const someSelected = selectedTasks.length > 0 && selectedTasks.length < tasks.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAll(e.target.checked);
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>Nenhuma task encontrada</h3>
        <p>Clique no botão "Adicionar" para criar sua primeira task!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {/* Header com seleção global */}
      <div className="task-list-header">
        <div className="select-all-container">
          <input
            type="checkbox"
            checked={allSelected}
            ref={input => {
              if (input) input.indeterminate = someSelected;
            }}
            onChange={handleSelectAll}
            className="select-all-checkbox"
          />
          <label className="select-all-label">
            {allSelected
              ? `Todas as ${tasks.length} tasks selecionadas`
              : someSelected
              ? `${selectedTasks.length} de ${tasks.length} tasks selecionadas`
              : `Selecionar todas (${tasks.length})`}
          </label>
        </div>

        {selectedTasks.length > 0 && (
          <div className="selection-summary">
            <span className="selection-badge">
              {selectedTasks.length} selecionada{selectedTasks.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Lista de tasks */}
      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} isSelected={selectedTasks.includes(task.id)} onSelect={onSelectTask} />
        ))}
      </ul>
    </div>
  );
}

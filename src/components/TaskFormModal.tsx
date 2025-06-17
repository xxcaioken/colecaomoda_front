import React, { useEffect, useState } from "react";
import { Task } from "../types/task";

interface TaskFormModalProps {
  task?: Task | null;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!task;

  useEffect(
    () => {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      } else {
        setTitle("");
        setDescription("");
      }
    },
    [task]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(title.trim(), description.trim());
      // Reset form se for adicionar nova task
      if (!isEditing) {
        setTitle("");
        setDescription("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="task-title">Título da Task *</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Digite o título da task..."
          className="form-input"
          required
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Descrição *</label>
        <textarea
          id="task-description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Digite a descrição da task..."
          className="form-textarea"
          rows={4}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={!title.trim() || !description.trim() || isSubmitting} className="btn-primary">
          {isSubmitting ? (
            <>⏳ {isEditing ? "Salvando..." : "Criando..."}</>
          ) : (
            <>✓ {isEditing ? "Salvar Alterações" : "Criar Task"}</>
          )}
        </button>

        <button type="button" onClick={handleCancel} disabled={isSubmitting} className="btn-secondary">
          ✕ Cancelar
        </button>
      </div>
    </form>
  );
};

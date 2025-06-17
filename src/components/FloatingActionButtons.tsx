import React from "react";
import "./FloatingActionButtons.css";

interface FloatingActionButtonsProps {
  selectedCount: number;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  selectedCount,
  onAdd,
  onEdit,
  onDelete,
  onComplete
}) => {
  const hasSelection = selectedCount > 0;
  const singleSelection = selectedCount === 1;

  return (
    <div className="fab-container">
      <button className="fab fab-primary" onClick={onAdd} title="Adicionar nova task">
        <span className="fab-icon">+</span>
        <span className="fab-text">Adicionar</span>
      </button>

      {hasSelection && (
        <>
          {singleSelection && (
            <button className="fab fab-edit" onClick={onEdit} title="Editar task selecionada">
              <span className="fab-icon">✏️</span>
              <span className="fab-text">Editar</span>
            </button>
          )}

          <button className="fab fab-complete" onClick={onComplete} title={`Alterar status de ${selectedCount} task(s)`}>
            <span className="fab-icon">✓</span>
            <span className="fab-text">{selectedCount === 1 ? "Status" : `Status (${selectedCount})`}</span>
          </button>

          <button className="fab fab-delete" onClick={onDelete} title={`Deletar ${selectedCount} task(s) selecionada(s)`}>
            <span className="fab-icon">🗑️</span>
            <span className="fab-text">{selectedCount === 1 ? "Deletar" : `Deletar (${selectedCount})`}</span>
          </button>
        </>
      )}

      {hasSelection && (
        <div className="selection-indicator">
          <span className="selection-count">{selectedCount}</span>
          <span className="selection-text">{selectedCount === 1 ? "item selecionado" : "itens selecionados"}</span>
        </div>
      )}
    </div>
  );
};

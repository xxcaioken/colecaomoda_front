import React from "react";

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
      {/* Botão principal de adicionar - sempre visível */}
      <button className="fab fab-primary" onClick={onAdd} title="Adicionar nova task">
        <span className="fab-icon">+</span>
        <span className="fab-text">Adicionar</span>
      </button>

      {/* Botões que aparecem quando há seleção */}
      {hasSelection && (
        <>
          {/* Botão de editar - apenas para seleção única */}
          {singleSelection && (
            <button className="fab fab-edit" onClick={onEdit} title="Editar task selecionada">
              <span className="fab-icon">✏️</span>
              <span className="fab-text">Editar</span>
            </button>
          )}

          {/* Botão de completar/reabrir */}
          <button className="fab fab-complete" onClick={onComplete} title={`Alterar status de ${selectedCount} task(s)`}>
            <span className="fab-icon">✓</span>
            <span className="fab-text">{selectedCount === 1 ? "Status" : `Status (${selectedCount})`}</span>
          </button>

          {/* Botão de deletar */}
          <button className="fab fab-delete" onClick={onDelete} title={`Deletar ${selectedCount} task(s) selecionada(s)`}>
            <span className="fab-icon">🗑️</span>
            <span className="fab-text">{selectedCount === 1 ? "Deletar" : `Deletar (${selectedCount})`}</span>
          </button>
        </>
      )}

      {/* Indicador de seleção */}
      {hasSelection && (
        <div className="selection-indicator">
          <span className="selection-count">{selectedCount}</span>
          <span className="selection-text">{selectedCount === 1 ? "item selecionado" : "itens selecionados"}</span>
        </div>
      )}
    </div>
  );
};

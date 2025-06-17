import { useState } from "react";
import { FloatingActionButtons } from "../components/FloatingActionButtons";
import { Modal } from "../components/Modal";
import { TaskFormModal } from "../components/TaskFormModal";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task";

export const HomePage = () => {
  const { tasks, loading, addTask, removeTask, editTask, finishTask } = useTasks();

  // Estados para seleção múltipla
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  // Estados do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Funções de seleção
  const handleSelectTask = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedTasks(prev => [...prev, id]);
    } else {
      setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedTasks(tasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  // Funções dos FABs
  const handleAddTask = () => {
    setModalType("add");
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTask = () => {
    const selectedTask = tasks.find(task => selectedTasks.includes(task.id));
    if (selectedTask) {
      setModalType("edit");
      setTaskToEdit(selectedTask);
      setIsModalOpen(true);
    }
  };

  const handleDeleteTasks = async () => {
    if (selectedTasks.length === 0) return;

    const confirmMessage =
      selectedTasks.length === 1
        ? "Tem certeza que deseja deletar esta task?"
        : `Tem certeza que deseja deletar ${selectedTasks.length} tasks?`;

    if (window.confirm(confirmMessage)) {
      try {
        // Deletar todas as tasks selecionadas
        await Promise.all(selectedTasks.map(taskId => removeTask(taskId)));
        setSelectedTasks([]);
      } catch (error) {
        console.error("Erro ao deletar tasks:", error);
        alert("Erro ao deletar tasks. Tente novamente.");
      }
    }
  };

  const handleToggleComplete = async () => {
    if (selectedTasks.length === 0) return;

    try {
      // Alternar status de todas as tasks selecionadas
      await Promise.all(selectedTasks.map(taskId => finishTask(taskId)));
      setSelectedTasks([]);
    } catch (error) {
      console.error("Erro ao alterar status das tasks:", error);
      alert("Erro ao alterar status das tasks. Tente novamente.");
    }
  };

  // Funções do modal
  const handleSaveTask = async (title: string, description: string) => {
    try {
      if (modalType === "add") {
        await addTask(title, description);
      } else if (taskToEdit) {
        await editTask({ ...taskToEdit, title, description });
        setSelectedTasks([]);
      }
      setIsModalOpen(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error("Erro ao salvar task:", error);
      alert("Erro ao salvar task. Tente novamente.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="homepage">
      <header className="page-header">
        <h1>Lista de Tarefas</h1>
        <p className="page-subtitle">Gerencie suas tasks de forma eficiente</p>
      </header>

      <main className="page-content">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner">⏳</div>
            <p>Carregando tasks...</p>
          </div>
        ) : (
          <TaskList tasks={tasks} selectedTasks={selectedTasks} onSelectTask={handleSelectTask} onSelectAll={handleSelectAll} />
        )}
      </main>

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        selectedCount={selectedTasks.length}
        onAdd={handleAddTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTasks}
        onComplete={handleToggleComplete}
      />

      {/* Modal para adicionar/editar tasks */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalType === "add" ? "Adicionar Nova Task" : "Editar Task"}
      >
        <TaskFormModal task={taskToEdit} onSave={handleSaveTask} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

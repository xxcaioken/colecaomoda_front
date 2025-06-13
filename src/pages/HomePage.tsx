import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'

export const HomePage = () => {
    const { tasks, loading, addTask, removeTask, editTask, finishTask } = useTasks()

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <TaskForm onAdd={addTask} />
            {loading ? <p>Carregando...</p> : (
                <TaskList
                    tasks={tasks}
                    onDelete={removeTask}
                    onEdit={editTask}
                    onComplete={finishTask}
                />
            )}
        </div>
    )
}

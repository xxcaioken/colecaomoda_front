import { Task } from '../types/task'
import { TaskItem } from './TaskItem'

type Props = {
  tasks: Task[]
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
  onComplete: (id: string) => void
}

export function TaskList({ tasks, onDelete, onEdit, onComplete }: Props) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={onComplete}
        />
      ))}
    </ul>
  )
}

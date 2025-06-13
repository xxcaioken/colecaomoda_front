import { Task } from '../types/task'

export async function getTasks(): Promise<Task[]> {
  return []
}

export async function createTask(title: string, description: string): Promise<Task> {
  return {
    id: '',
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

export async function updateTask(task: Task): Promise<Task> {
  return { ...task, updatedAt: new Date().toISOString() }
}

export async function deleteTask(id: string): Promise<void> {}

export async function completeTask(id: string): Promise<Task> {
  return {
    id,
    title: '',
    description: '',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
} 
import { Task } from '../types/task'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api'

const debugLog = (message: string, data?: any) => {
  if (process.env.REACT_APP_DEBUG === 'true') {
    console.log(`[API Debug] ${message}`, data)
  }
}

export async function getTasks(): Promise<Task[]> {
  debugLog('Buscando todas as tasks')
  const response = await fetch(`${API_BASE_URL}/tasks`)
  const data = await response.json()
  debugLog('Tasks recebidas:', data.data)
  return data.data
}

export async function createTask(title: string, description: string): Promise<Task> {
  debugLog('Criando nova task:', { title, description })
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task: {
        title,
        description,
        completed: false,
        inserted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    })
  })
  const data = await response.json()
  debugLog('Task criada:', data.data)
  return data.data
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task: {
        title: task.title,
        description: task.description,
        completed: task.completed,
        updatedAt: new Date().toISOString()
      }
    })
  })
  const data = await response.json()
  return data.data
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
}

export async function completeTask(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  return data.data
}

export async function getTask(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
  const data = await response.json()
  return data.data
} 
import { Task } from '../types/task'
import { getCurrentISOString } from '../utils/dateUtils'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api'

const debugLog = (message: string, data?: any) => {
  if (process.env.REACT_APP_DEBUG === 'true') {
    console.log(`[API Debug] ${message}`, data)
  }
}

const handleAPIError = (error: any, operation: string): never => {
  console.error(`Erro na operação ${operation}:`, error)
  
  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    throw new Error('Não foi possível conectar com o servidor. Verifique se a API está rodando.')
  }
  
  throw error
}

export async function getTasks(): Promise<Task[]> {
  try {
    debugLog('Buscando todas as tasks')
    const response = await fetch(`${API_BASE_URL}/tasks`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    debugLog('Tasks recebidas:', data.data)
    return data.data || []
  } catch (error) {
    return handleAPIError(error, 'buscar tasks')
  }
}

export async function createTask(title: string, description: string): Promise<Task> {
  try {
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
          inserted_at: getCurrentISOString(),
          updated_at: getCurrentISOString()
        }
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    debugLog('Task criada:', data.data)
    return data.data
  } catch (error) {
    return handleAPIError(error, 'criar task')
  }
}

export async function updateTask(task: Task): Promise<Task> {
  try {
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
          updated_at: getCurrentISOString()
        }
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    return handleAPIError(error, 'atualizar task')
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
  } catch (error) {
    handleAPIError(error, 'deletar task')
  }
}

export async function completeTask(id: string): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    return handleAPIError(error, 'completar task')
  }
}

export async function getTask(id: string): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    return handleAPIError(error, 'buscar task')
  }
} 
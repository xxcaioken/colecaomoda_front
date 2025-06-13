import { useState, useEffect } from 'react'
import { Task } from '../types/task'
import { getTasks, createTask, updateTask, deleteTask, completeTask } from '../api/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTasks().then(data => {
      setTasks(data)
      setLoading(false)
    })
  }, [])

  const addTask = async (title: string, description: string) => {
    const newTask = await createTask(title, description)
    setTasks(prev => [...prev, newTask])
  }

  const removeTask = async (id: string) => {
    await deleteTask(id)
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const editTask = async (task: Task) => {
    const updated = await updateTask(task)
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))
  }

  const finishTask = async (id: string) => {
    const updated = await completeTask(id)
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))
  }

  return { tasks, loading, addTask, removeTask, editTask, finishTask }
}

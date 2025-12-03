import { useState, useEffect } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import Column from './Column'

const STORAGE_KEY = 'kanban-board-data'

const defaultColumns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: []
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: []
  },
  {
    id: 'done',
    title: 'Done',
    tasks: []
  }
]

const priorities = ['High', 'Medium', 'Low']
const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-orange-500',
  Low: 'bg-green-500'
}

function KanbanBoard() {
  const [columns, setColumns] = useState(defaultColumns)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setColumns(parsedData)
      } catch (error) {
        console.error('Error parsing saved data:', error)
      }
    }
  }, [])

  // Save to localStorage whenever columns change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
  }, [columns])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If dropped outside a droppable area
    if (!destination) {
      return
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)

    // Moving within the same column
    if (sourceColumn.id === destColumn.id) {
      const newTasks = Array.from(sourceColumn.tasks)
      const [removed] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, removed)

      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.id === sourceColumn.id
            ? { ...col, tasks: newTasks }
            : col
        )
      )
    } else {
      // Moving between different columns
      const sourceTasks = Array.from(sourceColumn.tasks)
      const destTasks = Array.from(destColumn.tasks)
      const [removed] = sourceTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, removed)

      setColumns(prevColumns =>
        prevColumns.map(col => {
          if (col.id === sourceColumn.id) {
            return { ...col, tasks: sourceTasks }
          }
          if (col.id === destColumn.id) {
            return { ...col, tasks: destTasks }
          }
          return col
        })
      )
    }
  }

  const addTask = (columnId, taskTitle) => {
    if (!taskTitle.trim()) return

    const newTask = {
      id: `task-${Date.now()}-${Math.random()}`,
      title: taskTitle,
      priority: priorities[Math.floor(Math.random() * priorities.length)]
    }

    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    )
  }

  const deleteTask = (columnId, taskId) => {
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
          : col
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Kanban Board</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                priorityColors={priorityColors}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default KanbanBoard

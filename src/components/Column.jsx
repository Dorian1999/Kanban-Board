import { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'
import { Plus } from 'lucide-react'

function Column({ column, onAddTask, onDeleteTask, priorityColors }) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAddTask(column.id, taskTitle)
      setTaskTitle('')
      setIsAddingTask(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    } else if (e.key === 'Escape') {
      setIsAddingTask(false)
      setTaskTitle('')
    }
  }

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg p-4 min-h-[500px]">
      <h2 className="text-xl font-semibold text-white mb-4">{column.title}</h2>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 transition-colors duration-200 rounded-md p-2 ${
              snapshot.isDraggingOver ? 'bg-gray-700/50' : ''
            }`}
          >
            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={() => onDeleteTask(column.id, task.id)}
                priorityColors={priorityColors}
              />
            ))}
            {provided.placeholder}
            
            {isAddingTask ? (
              <div className="mt-2">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter task title..."
                  autoFocus
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingTask(false)
                      setTaskTitle('')
                    }}
                    className="px-4 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingTask(true)}
                className="mt-2 w-full py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Plus size={16} />
                Add Task
              </button>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column

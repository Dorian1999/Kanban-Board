import { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Trash2 } from 'lucide-react'

function TaskCard({ task, index, onDelete, priorityColors }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`bg-gray-700 rounded-lg p-4 mb-3 border border-gray-600 hover:border-gray-500 transition-all duration-200 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging ? 'shadow-lg rotate-2' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-white text-sm mb-2">{task.title}</p>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className={`transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Delete task"
            >
              <Trash2
                size={16}
                className="text-red-400 hover:text-red-500 transition-colors"
              />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard

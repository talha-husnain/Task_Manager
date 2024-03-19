import React, { useState } from 'react';
import { Task } from '../interfaces';
import { motion } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, description: string, priority: 'low' | 'medium' | 'high', completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onToggle,
  onUpdate,
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState<string>('');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [editCompleted, setEditCompleted] = useState<boolean>(false);

  const handleEdit = (task: Task) => {
    setEditId(task.id);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setEditCompleted(task.completed);
  };

  const handleSave = () => {
    if (editId !== null) {
      onUpdate(editId, editDescription, editPriority, editCompleted);
      setEditId(null);
      setEditDescription('');
      setEditPriority('medium');
      setEditCompleted(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditDescription('');
    setEditPriority('medium');
    setEditCompleted(false);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${task.completed ? 'bg-gray-600' : 'bg-gray-700'}`}
        >
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="flex-1 p-2 mr-4 rounded-lg bg-gray-600 text-white"
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="p-2 mr-4 rounded-lg bg-gray-600 text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Save
              </button>
              <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className={`flex-1 cursor-pointer ${task.completed ? 'line-through' : ''}`} onDoubleClick={() => handleEdit(task)}>
                {task.description}
              </span>
              <span className="text-sm text-gray-400">
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <button onClick={() => onToggle(task.id)} className={`text-xs font-semibold py-1 px-2 rounded ${task.completed ? 'bg-green-600' : 'bg-yellow-500'}`}>
                {task.completed ? 'Completed' : 'Complete'}
              </button>
              <button onClick={() => handleEdit(task)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Edit
              </button>
              <button onClick={() => onDelete(task.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                Delete
              </button>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;

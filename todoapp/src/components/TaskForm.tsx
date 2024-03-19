import React, { useState } from 'react';

interface TaskFormProps {
  onAdd: (description: string, priority: 'low' | 'medium' | 'high') => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Task description cannot be empty.');
      return;
    }
    onAdd(description, priority);
    setDescription('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up p-4 shadow-lg rounded-lg bg-gray-800 text-white">
      <div className="mb-4">
        <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-300">
          Task Description
        </label>
        <input
          id="taskDescription"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 placeholder-gray-400"
          placeholder="Enter task description"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-300">
          Priority
        </label>
        <select
          id="taskPriority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <option value="low" className="bg-gray-800">Low</option>
          <option value="medium" className="bg-gray-800">Medium</option>
          <option value="high" className="bg-gray-800">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ease-in-out duration-150"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;

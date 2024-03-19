import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../interfaces/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'created' | 'priority'>('created');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/tasks');
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const fetchedTasks = await response.json();
    setTasks(fetchedTasks);
  };

  const addTask = async (description: string, priority: 'low' | 'medium' | 'high') => {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description,
        completed: false,
        created: new Date().toISOString(),
        priority,
      }),
    });
    if (!response.ok) throw new Error('Failed to add task');
    fetchTasks();
  };

  const updateTask = async (id: number, description: string, priority: 'low' | 'medium' | 'high', completed: boolean) => {
    const response = await fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description,
        priority,
        completed,
      }),
    });
    if (!response.ok) throw new Error('Failed to update task');
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`/tasks/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete task');
    fetchTasks();
  };

  const toggleTaskCompletion = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await updateTask(id, task.description, task.priority, !task.completed);
  };
  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSortBy: 'created' | 'priority') => {
    setSortBy(newSortBy);
  };

  const getSortedAndFilteredTasks = () => {
    return tasks
      .filter((task) => filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed))
      .sort((a, b) => {
        if (sortBy === 'created') {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        }
        const priorityMap = { high: 3, medium: 2, low: 1 };
        return (priorityMap[b.priority as keyof typeof priorityMap] || 0) -
          (priorityMap[a.priority as keyof typeof priorityMap] || 0);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-white">
      <header className="bg-gradient-to-r from-blue-700 to-purple-600 p-4 text-center shadow-lg">
        <h1 className="text-4xl font-bold">Task Manager</h1>
      </header>
      <main className="container mx-auto p-6 mt-4 mb-16 rounded-lg shadow-lg bg-gray-800 bg-opacity-80">
        <TaskForm onAdd={addTask} />
        <div className="my-4">
          <button onClick={() => handleFilterChange('all')} className="mx-2">All</button>
          <button onClick={() => handleFilterChange('active')} className="mx-2">Active</button>
          <button onClick={() => handleFilterChange('completed')} className="mx-2">Completed</button>
          <button onClick={() => handleSortChange('created')} className="mx-2">Newest</button>
          <button onClick={() => handleSortChange('priority')} className="mx-2">Priority</button>
        </div>
        <TaskList
          tasks={getSortedAndFilteredTasks()}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggle={toggleTaskCompletion}
        />
      </main>
      <footer className="bg-gradient-to-r from-blue-800 to-purple-700 text-center p-4 fixed bottom-0 w-full text-white">
        <div className="flex justify-center items-center space-x-6">
          <a href="https://github.com/talha-husnain" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faGithub} />
            <span>GitHub</span>
          </a>
          <a href="mailto:talhahusnain1061@gmail.com" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>talhahusnain1061@gmail.com</span>
          </a>
          <a href="tel:+93114739822" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPhone} />
            <span>+93114739822</span>
          </a>
          <a href="https://www.linkedin.com/in/talha-husnain-a93139206/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faLinkedin} />
            <span>LinkedIn</span>
          </a>
          <p> Made with ❤️  </p>

          <p>&copy; 2024 Talha Husnain</p>
        </div>
      </footer>
    </div>
  );
};

export default Todo;

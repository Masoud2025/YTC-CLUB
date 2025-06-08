'use client';
import React, { useState, useEffect } from 'react';

// Task interface (removed date fields)
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

// Task status options
const statusOptions = [
  {
    value: 'todo',
    label: 'انجام نشده',
    color: 'bg-gray-500',
    bgColor: 'bg-gray-50',
  },
  {
    value: 'in-progress',
    label: 'در حال انجام',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    value: 'done',
    label: 'انجام شده',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
  },
];

// Priority options
const priorityOptions = [
  {
    value: 'low',
    label: 'کم',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    value: 'medium',
    label: 'متوسط',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    value: 'high',
    label: 'بالا',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'status'>('priority');

  // Form state (removed date field)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = () => {
    try {
      const savedTasks = localStorage.getItem('USER_TASKS');
      if (savedTasks) {
        const parsedTasks: Task[] = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
  };

  const saveTasks = () => {
    try {
      localStorage.setItem('USER_TASKS', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  };

  // Generate unique ID
  const generateId = () => {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add new task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('عنوان تسک الزامی است');
      return;
    }

    const newTask: Task = {
      id: generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
    };

    setTasks(prev => [newTask, ...prev]);
    resetForm();
    setShowAddModal(false);
  };

  // Update existing task
  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !editingTask) {
      alert('عنوان تسک الزامی است');
      return;
    }

    const updatedTask: Task = {
      ...editingTask,
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
    };

    setTasks(prev =>
      prev.map(task => (task.id === editingTask.id ? updatedTask : task)),
    );

    resetForm();
    setEditingTask(null);
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    if (confirm('آیا از حذف این تسک اطمینان دارید؟')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  // Quick status update
  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // Start editing task
  const startEditing = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    setShowAddModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
    resetForm();
    setShowAddModal(false);
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesStatus =
        filterStatus === 'all' || task.status === filterStatus;
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'status':
          const statusOrder = { todo: 1, 'in-progress': 2, done: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

  // Get status info
  const getStatusInfo = (status: Task['status']) => {
    return (
      statusOptions.find(option => option.value === status) || statusOptions[0]
    );
  };

  // Get priority info
  const getPriorityInfo = (priority: Task['priority']) => {
    return (
      priorityOptions.find(option => option.value === priority) ||
      priorityOptions[1]
    );
  };

  // Task statistics
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">مدیریت تسک‌ها</h1>
        <p className="text-gray-600">
          تسک‌های خود را مدیریت کنید و پیشرفت کارهایتان را دنبال کنید
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-md border">
          <div className="text-2xl font-bold text-gray-800">
            {taskStats.total}
          </div>
          <div className="text-sm text-gray-600">کل تسک‌ها</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 shadow-md border">
          <div className="text-2xl font-bold text-gray-600">
            {taskStats.todo}
          </div>
          <div className="text-sm text-gray-600">انجام نشده</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 shadow-md border">
          <div className="text-2xl font-bold text-blue-600">
            {taskStats.inProgress}
          </div>
          <div className="text-sm text-blue-600">در حال انجام</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 shadow-md border">
          <div className="text-2xl font-bold text-green-600">
            {taskStats.done}
          </div>
          <div className="text-sm text-green-600">انجام شده</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Add Task Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            افزودن تسک جدید
          </button>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در تسک‌ها..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">همه وضعیت‌ها</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'priority' | 'status')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="priority">مرتب‌سازی بر اساس اولویت</option>
              <option value="status">مرتب‌سازی بر اساس وضعیت</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {tasks.length === 0
                ? 'هنوز تسکی اضافه نکرده‌اید'
                : 'تسکی با این فیلتر یافت نشد'}
            </h3>
            <p className="text-gray-600 mb-6">
              {tasks.length === 0
                ? 'برای شروع، اولین تسک خود را اضافه کنید'
                : 'فیلترها را تغییر دهید یا عبارت جستجوی جدیدی امتحان کنید'}
            </p>
            {tasks.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                افزودن اولین تسک
              </button>
            )}
          </div>
        ) : (
          filteredAndSortedTasks.map(task => {
            const statusInfo = getStatusInfo(task.status);
            const priorityInfo = getPriorityInfo(task.priority);

            return (
              <div
                key={task.id}
                className={`bg-white rounded-lg p-6 shadow-md border-r-4 transition-all hover:shadow-lg ${statusInfo.color.replace(
                  'bg-',
                  'border-',
                )}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Task Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className={`text-lg font-bold ${
                          task.status === 'done'
                            ? 'line-through text-gray-500'
                            : 'text-gray-800'
                        }`}
                      >
                        {task.title}
                      </h3>

                      {/* Priority Badge */}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color} ${priorityInfo.bgColor}`}
                      >
                        {priorityInfo.label}
                      </span>
                    </div>

                    {task.description && (
                      <p
                        className={`text-gray-600 ${
                          task.status === 'done' ? 'line-through' : ''
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Status Selector */}
                    <select
                      value={task.status}
                      onChange={e =>
                        handleStatusChange(
                          task.id,
                          e.target.value as Task['status'],
                        )
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium border-2 ${
                        statusInfo.bgColor
                      } ${statusInfo.color.replace(
                        'bg-',
                        'text-',
                      )} ${statusInfo.color.replace('bg-', 'border-')}`}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(task)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="ویرایش"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              {editingTask ? 'ویرایش تسک' : 'افزودن تسک جدید'}
            </h2>

            <form
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              className="space-y-4"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان تسک *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="عنوان تسک را وارد کنید"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="توضیحات اضافی (اختیاری)"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وضعیت
                </label>
                <select
                  value={formData.status}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      status: e.target.value as Task['status'],
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اولویت
                </label>
                <select
                  value={formData.priority}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      priority: e.target.value as Task['priority'],
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {editingTask ? 'بروزرسانی تسک' : 'افزودن تسک'}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  لغو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

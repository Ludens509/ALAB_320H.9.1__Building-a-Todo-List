import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import styles from './Home.module.css'
import Motivation from '../components/motivation';

export default function TodoApp() {
  // State management
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Complete project presentation",
      category: "work",
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      text: "Buy groceries for the week",
      category: "home",
      completed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      text: "Review JavaScript concepts",
      category: "study",
      completed: false,
      createdAt: new Date().toISOString()
    }
  ]);

  const [taskInput, setTaskInput] = useState('');
  const [category, setCategory] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMotivation, setShowMotivation] = useState(false);

  // Motivational quotes
  const motivationalQuotes = [
    "You're absolutely crushing it! Every task completed is a step toward your goals! 🌟",
    "Look at you go! Your productivity game is on fire! 🔥",
    "Amazing work! You've turned your to-do list into a done list! ✨",
    "You're a task-completing machine! Nothing can stop you now! 🚀",
    "Incredible! You've conquered every challenge on your list! 🏆",
    "Wow! Your dedication and focus are truly inspiring! 💪",
    "Outstanding! You've proven that you can achieve anything you set your mind to! 🎯"
  ];

  // Check for all tasks completed
  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
      setShowMotivation(true);
    }
  }, [tasks]);

  // Handle adding task
  const handleAddTask = () => {
    const trimmedText = taskInput.trim();

    if (!trimmedText) {
      setErrorMessage('Please enter a task description');
      return;
    }

    if (!category) {
      setErrorMessage('Please select a category');
      return;
    }

    if (isDuplicateTask(trimmedText)) {
      setErrorMessage('This task already exists!');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      category: category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
    setCategory('');
    setErrorMessage('');
  };

  // Check for duplicates
  const isDuplicateTask = (text) => {
    return tasks.some(task => 
      task.text.toLowerCase() === text.toLowerCase() && !task.completed
    );
  };

  // Real-time validation
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTaskInput(value);
    
    if (value.trim() && isDuplicateTask(value.trim())) {
      setErrorMessage('This task already exists!');
    } else {
      setErrorMessage('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Get filtered tasks
  const getFilteredTasks = () => {
    switch (currentFilter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'work':
      case 'home':
      case 'study':
        return tasks.filter(task => task.category === currentFilter);
      default:
        return tasks;
    }
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
  };

  // Get category styling
  const getCategoryColor = (cat) => {
    const colors = {
      work: '#e74c3c',
      home: '#3498db',
      study: '#f39c12'
    };
    return colors[cat] || '#95a5a6';
  };

  const getCategoryBadgeStyle = (cat) => {
    const styles = {
      work: { backgroundColor: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' },
      home: { backgroundColor: 'rgba(52, 152, 219, 0.1)', color: '#3498db' },
      study: { backgroundColor: 'rgba(243, 156, 18, 0.1)', color: '#f39c12' }
    };
    return styles[cat] || { backgroundColor: '#f1f3f4', color: '#7f8c8d' };
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      work: '🏢',
      home: '🏠',
      study: '📚'
    };
    return icons[cat] || '📝';
  };

  const filteredTasks = getFilteredTasks();
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  // Inline styles
//   const styles = {
//     appContainer: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       padding: '20px',
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     },
//     container: {
//       maxWidth: '600px',
//       margin: '0 auto',
//       backgroundColor: 'white',
//       borderRadius: '24px',
//       boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
//       padding: '32px',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     topBorder: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '4px',
//       background: 'linear-gradient(90deg, #e74c3c, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)'
//     },
//     header: {
//       textAlign: 'center',
//       marginBottom: '32px'
//     },
//     headerTitle: {
//       fontSize: '2.5rem',
//       fontWeight: '300',
//       color: '#2c3e50',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '12px'
//     },
//     formContainer: {
//       backgroundColor: '#f8f9fa',
//       padding: '24px',
//       borderRadius: '16px',
//       marginBottom: '32px',
//       border: '2px solid transparent',
//       transition: 'all 0.3s ease'
//     },
//     errorMessage: {
//       backgroundColor: '#ffe6e6',
//       color: '#c62828',
//       padding: '16px',
//       borderRadius: '10px',
//       marginBottom: '16px',
//       border: '1px solid #ffcdd2'
//     },
//     inputGroup: {
//       display: 'flex',
//       gap: '16px',
//       marginBottom: '16px',
//       flexWrap: 'wrap'
//     },
//     input: {
//       flex: '2',
//       minWidth: '200px',
//       padding: '12px 16px',
//       border: '2px solid #e0e0e0',
//       borderRadius: '10px',
//       fontSize: '16px',
//       transition: 'all 0.3s ease',
//       backgroundColor: 'white',
//       outline: 'none'
//     },
//     select: {
//       flex: '1',
//       minWidth: '120px',
//       padding: '12px 16px',
//       border: '2px solid #e0e0e0',
//       borderRadius: '10px',
//       fontSize: '16px',
//       transition: 'all 0.3s ease',
//       backgroundColor: 'white',
//       cursor: 'pointer',
//       outline: 'none'
//     },
//     addButton: {
//       width: '100%',
//       background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
//       color: 'white',
//       border: 'none',
//       padding: '12px 30px',
//       borderRadius: '10px',
//       cursor: 'pointer',
//       fontSize: '16px',
//       fontWeight: '600',
//       transition: 'all 0.3s ease'
//     },
//     stats: {
//       display: 'flex',
//       justifyContent: 'space-around',
//       backgroundColor: '#f1f3f4',
//       padding: '20px',
//       borderRadius: '16px',
//       marginBottom: '24px'
//     },
//     statItem: {
//       textAlign: 'center'
//     },
//     statNumber: {
//       fontSize: '2rem',
//       fontWeight: 'bold',
//       color: '#2c3e50',
//       display: 'block'
//     },
//     statLabel: {
//       color: '#7f8c8d',
//       fontSize: '0.9rem',
//       marginTop: '5px'
//     },
//     filterButtons: {
//       display: 'flex',
//       gap: '10px',
//       marginBottom: '20px',
//       flexWrap: 'wrap'
//     },
//     filterButton: {
//       padding: '8px 16px',
//       border: '2px solid #ddd',
//       backgroundColor: 'white',
//       borderRadius: '25px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       fontSize: '14px',
//       fontWeight: '500'
//     },
//     filterButtonActive: {
//       padding: '8px 16px',
//       border: '2px solid #4ecdc4',
//       backgroundColor: '#4ecdc4',
//       color: 'white',
//       borderRadius: '25px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       fontSize: '14px',
//       fontWeight: '500'
//     },
//     taskList: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0
//     },
//     taskItem: {
//       backgroundColor: 'white',
//       marginBottom: '16px',
//       padding: '20px',
//       borderRadius: '12px',
//       borderLeft: '5px solid',
//       boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
//       transition: 'all 0.3s ease'
//     },
//     taskItemCompleted: {
//       backgroundColor: '#f8f9fa',
//       marginBottom: '16px',
//       padding: '20px',
//       borderRadius: '12px',
//       borderLeft: '5px solid',
//       boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
//       transition: 'all 0.3s ease',
//       opacity: 0.7
//     },
//     taskContent: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     taskInfo: {
//       flex: 1
//     },
//     taskText: {
//       fontSize: '18px',
//       fontWeight: '500',
//       marginBottom: '8px',
//       color: '#2c3e50'
//     },
//     taskTextCompleted: {
//       fontSize: '18px',
//       fontWeight: '500',
//       marginBottom: '8px',
//       textDecoration: 'line-through',
//       color: '#95a5a6'
//     },
//     taskCategory: {
//       display: 'inline-block',
//       padding: '4px 12px',
//       borderRadius: '20px',
//       fontSize: '12px',
//       textTransform: 'uppercase',
//       fontWeight: '600',
//       letterSpacing: '0.5px'
//     },
//     taskActions: {
//       display: 'flex',
//       gap: '10px',
//       marginLeft: '16px'
//     },
//     completeButton: {
//       padding: '8px 12px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#2ecc71',
//       color: 'white'
//     },
//     completeButtonCompleted: {
//       padding: '8px 12px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#95a5a6',
//       color: 'white'
//     },
//     deleteButton: {
//       padding: '8px 12px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#e74c3c',
//       color: 'white'
//     },
//     emptyState: {
//       textAlign: 'center',
//       padding: '60px 20px',
//       color: '#bdc3c7'
//     },
//     emptyStateIcon: {
//       fontSize: '4rem',
//       marginBottom: '20px'
//     },
//     emptyStateTitle: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       marginBottom: '10px'
//     },
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       zIndex: 999
//     },
//     motivationPopup: {
//       position: 'fixed',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       backgroundColor: 'white',
//       padding: '40px',
//       borderRadius: '20px',
//       boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
//       textAlign: 'center',
//       zIndex: 1000,
//       maxWidth: '400px',
//       width: '90%'
//     },
//     motivationTitle: {
//       color: '#2c3e50',
//       marginBottom: '20px',
//       fontSize: '1.8rem',
//       fontWeight: '600'
//     },
//     motivationText: {
//       color: '#7f8c8d',
//       fontSize: '1.1rem',
//       lineHeight: '1.6',
//       marginBottom: '25px'
//     },
//     motivationButton: {
//       background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
//       color: 'white',
//       border: 'none',
//       padding: '12px 25px',
//       borderRadius: '25px',
//       cursor: 'pointer',
//       fontSize: '16px',
//       fontWeight: '600',
//       transition: 'all 0.3s ease'
//     }
//   };

  return (
    <div className={styles.appContainer}>
      <div className={styles.container}>
        {/* Decorative top border */}
        <div className={styles.topBorder}></div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>
            My Tasks
            <Sparkles style={{ width: '32px', height: '32px', color: '#667eea' }} />
          </h1>
        </div>

        {/* Input Section */}
        <div className={styles.formContainer}>
          {errorMessage && (
            <div className={styles.errorMessage}>
              {errorMessage}
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={taskInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="What needs to be done?"
              maxLength={100}
              className={styles.input}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="">Choose category</option>
              <option value="work">🏢 Work</option>
              <option value="home">🏠 Home</option>
              <option value="study">📚 Study</option>
            </select>
          </div>
          <button
            onClick={handleAddTask}
            className={styles.addButton}
          >
            Add Task
          </button>
        </div>

        {/* Statistics */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.total}</span>
            <div className={styles.statLabel}>Total Tasks</div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.completed}</span>
            <div className={styles.statLabel}>Completed</div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.pending}</span>
            <div className={styles.statLabel}>Pending</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filterButtons}>
          {['all', 'pending', 'completed', 'work', 'home', 'study'].map(filter => (
            <button
              key={filter}
              onClick={() => setCurrentFilter(filter)}
              className={currentFilter === filter ? styles.filterButtonActive : styles.filterButton}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks
            </button>
          ))}
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📝</div>
            <h3 className={styles.emptyStateTitle}>No tasks yet!</h3>
            <p>Add your first task above to get started.</p>
          </div>
        ) : (
          <ul className={styles.taskList}>
            {filteredTasks.map(task => (
              <li
                key={task.id}
                className={{
                  ...(task.completed ? styles.taskItemCompleted : styles.taskItem),
                  borderLeftColor: getCategoryColor(task.category)
                }}
              >
                <div className={styles.taskContent}>
                  <div className={styles.taskInfo}>
                    <div className={task.completed ? styles.taskTextCompleted : styles.taskText}>
                      {task.text}
                    </div>
                    <span className={{
                      ...styles.taskCategory,
                      ...getCategoryBadgeStyle(task.category)
                    }}>
                      {getCategoryIcon(task.category)} {task.category.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.taskActions}>
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={task.completed ? styles.completeButtonCompleted : styles.completeButton}
                      title={task.completed ? 'Mark as pending' : 'Mark as complete'}
                    >
                      {task.completed ? '↺' : '✓'}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className={styles.deleteButton}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Motivation Popup */}
      {showMotivation && (
        <Motivation  setShowMotivation={setShowMotivation} randomQuote={randomQuote}/>
      )}
    </div>
  );
}
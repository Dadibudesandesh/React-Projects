import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false 
    };

    setTasks([...tasks, newTask]);
    setTask('');
  }

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  return (
    <div className='App d-flex justify-content-center align-items-center flex-column vh-100 bg-light'>
      <div className="card p-4 shadow" style={{ minWidth: '350px' }}>
        <h2 className="text-center mb-4">📝 To-Do List</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            value={task}
            className="form-control"
            placeholder="Enter a task"
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <button className="btn btn-primary" onClick={handleAddTask}>Add</button>
        </div>

        <ul className="list-group">
          {tasks.map((t) => (
            <li
              key={t.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${t.completed ? 'list-group-item-success' : ''}`}
            >
              <span
                onClick={() => handleToggleComplete(t.id)}
                style={{ textDecoration: t.completed ? 'line-through' : 'none', cursor: "pointer" }}
              >
                {t.text}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteTask(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

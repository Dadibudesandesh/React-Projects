import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      }
    } catch (err) {
      console.error("Error reading tasks from localStorage:", err);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === '') {
      alert("Enter task")
    } else {
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false
      };
      // console.log(...tasks)
      console.log(Date.now())
      setTasks([...tasks, newTask]);
      setTask('');
    }
  }


  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    console.log(tasks)
    // console.log(filteredTasks)
    setTasks(filteredTasks);
  }

  const handleToggleComplete = (id) => {
    // console.log(id)
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
}

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  }

  const handleEditingChange = (e) => {
    setEditingText(e.target.value)
  }

  const handleSaveEdit = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editingText } : t));
    setEditingId(null)
    setEditingText('');
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingText('');
  }

  return (
    <div className='App d-flex justify-content-center align-items-center flex-column vh-100 bg-dark'>
      <div className="card p-4 shadow" style={{ minWidth: '900px' }}>
        <h1 className="text-center mb-4">📝 To-Do List</h1>
        <div className="input-group mb-4">
          <input
            type="text"
            value={task}
            className="form-control"
            placeholder="Enter a task"
            onChange={(e) => setTask(e.target.value)}
          />



          <button className="btn btn-success" onClick={handleAddTask}>Add</button>
        </div>

        <ul className="list-group">
          {tasks.map((t) => (
            <li
              key={t.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${t.completed ? 'list-group-item-success' : ''}`}
            >
              <div className="d-flex align-items-center flex-grow-1">
                {
                  editingId === t.id ? (<input className="form-control me-2" value={editingText} onChange={handleEditingChange} />) : (<span
                    onClick={() => handleToggleComplete(t.id)}
                    style={{ textDecoration: t.completed ? 'line-through' : 'none', cursor: "pointer" }}
                  >
                    {t.text}
                  </span>
                  )}
              </div>
              <div className="btn-group">
                {editingId === t.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleSaveEdit(t.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleCancelEdit(t.id)}
                    >
                      cancel
                    </button>
                  </>
                ) :
                  (<button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditClick(t)}
                  >
                    Edit
                  </button>
                  )
                }
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteTask(t.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

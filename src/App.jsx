import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((item) => !item.completed));
  };

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="app">
      <main className="todo-card">
        <div className="header">
          <span className="eyebrow">YOUR DAILY PLANNER</span>
          <h1>My To-Do List</h1>
          <p>Small steps every day lead to big results.</p>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What do you need to do?"
            aria-label="New task"
          />
          <button type="submit" className="add-btn">
            + Add
          </button>
        </form>

        <div className="stats">
          <div>
            <strong>{tasks.length}</strong>
            <span>Total tasks</span>
          </div>
          <div>
            <strong>{completedCount}</strong>
            <span>Completed</span>
          </div>
          <div>
            <strong>{tasks.length - completedCount}</strong>
            <span>Remaining</span>
          </div>
        </div>

        <div className="list-heading">
          <h2>Your tasks</h2>
          {completedCount > 0 && (
            <button
              className="clear-btn"
              onClick={clearCompleted}
              type="button"
            >
              Clear completed
            </button>
          )}
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h3>All clear!</h3>
            <p>Add a task above to get started.</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((item) => (
              <li
                key={item.id}
                className={`task-item ${
                  item.completed ? "is-completed" : ""
                }`}
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  <span className="custom-check"></span>
                  <span className="task-text">{item.text}</span>
                </label>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                  aria-label={`Delete ${item.text}`}
                  title="Delete task"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer>One task at a time. You've got this!</footer>
      </main>
    </div>
  );
}

export default App;
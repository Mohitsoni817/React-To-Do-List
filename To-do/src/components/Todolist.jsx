import { useState } from "react";
import { useTodos } from "../context/Todocontext";
import Todoitem from "./Todoitem";

export default function Todolist() {
  const { todos, clearCompleted } = useTodos();
  const [filter, setFilter] = useState("all");

  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = todos.length - completed;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <section className="list-section">
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total tasks</span>
          <strong>{todos.length}</strong>
        </div>
        <div className="stat-card">
          <span>Remaining</span>
          <strong>{remaining}</strong>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>
      </div>

      <div className="list-toolbar">
        <h2>Your tasks</h2>
        <div className="filter-buttons">
          {["all", "active", "completed"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "filter-btn selected" : "filter-btn"}
              onClick={() => setFilter(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredTodos.length ? (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <Todoitem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div className="empty-check">✓</div>
          <h3>{todos.length ? "Nothing in this filter" : "You're all caught up!"}</h3>
          <p>
            {todos.length
              ? "Try another filter to see your tasks."
              : "Add your first task above to get started."}
          </p>
        </div>
      )}

      {completed > 0 && (
        <button className="clear-btn" onClick={clearCompleted} type="button">
          Clear completed tasks
        </button>
      )}
    </section>
  );
}
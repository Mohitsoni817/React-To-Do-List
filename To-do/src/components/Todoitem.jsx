import { useState } from "react";
import { useTodos } from "../context/Todocontext";

export default function Todoitem({ todo }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const saveEdit = (event) => {
    event.preventDefault();
    if (draft.trim()) {
      editTodo(todo.id, draft);
      setEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`Mark ${todo.text} complete`}
      />

      {editing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Edit task"
            autoFocus
          />
          <button type="submit" className="small-btn">Save</button>
          <button
            type="button"
            className="small-btn muted-btn"
            onClick={() => {
              setDraft(todo.text);
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="todo-actions">
            <button
              className="icon-btn"
              type="button"
              onClick={() => setEditing(true)}
              aria-label="Edit task"
              disabled={todo.completed}
            >
              Edit
            </button>
            <button
              className="icon-btn delete-action"
              type="button"
              onClick={() => deleteTodo(todo.id)}
              aria-label="Delete task"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
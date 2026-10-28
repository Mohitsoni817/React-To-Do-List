import { useState } from "react";
import { useTodos } from "../context/Todocontext";

export default function Todoform() {
  const [text, setText] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to get done?"
        aria-label="New task"
        maxLength={200}
      />
      <button className="primary-btn" type="submit">
        + Add task
      </button>
    </form>
  );
}
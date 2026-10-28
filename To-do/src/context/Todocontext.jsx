import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("react-todos")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("react-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((current) => [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used inside TodoProvider");
  }
  return context;
}
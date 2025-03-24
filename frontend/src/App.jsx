import "./App.css";
import React, { useEffect, useState } from "react";
import {
  initBlockchain,
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} from "./services/blockchainService";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const loadedTodos = await getTodos();
    setTodos(loadedTodos);
  };

  useEffect(() => {
    const init = async () => {
      await initBlockchain();
      await loadTodos();
    };
    init();
  }, []);

  const handleAddTodo = async (text) => {
    await addTodo(text);
    await loadTodos();
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodoStatus(todo.id).then(loadTodos)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id).then(loadTodos)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

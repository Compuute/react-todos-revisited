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
import TodoList from "./components/TodoList";
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
      <TodoList
        todos={todos}
        onToggle={(id) => toggleTodoStatus(id).then(loadTodos)}
        onDelete={(id) => deleteTodo(id).then(loadTodos)}
      />
    </div>
  );
}

export default App;
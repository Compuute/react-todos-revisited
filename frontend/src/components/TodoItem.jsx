import React from "react";

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li>
            <span
                onClick={onToggle}
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                
                }}
                >
                    {todo.text}
                </span>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
}

export default TodoItem;
import React, { useState } from "react";

function TodoForm({ onAddTodo}) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddTodo(text);
            setText("");

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;

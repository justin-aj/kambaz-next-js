"use client";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);

  const fetchTodos = async () => {
    const response = await fetch(`${HTTP_SERVER}/lab5/todos`);
    const todos = await response.json();
    setTodos(todos);
  };

  const removeTodo = async (todo: any) => {
    const response = await fetch(
      `${HTTP_SERVER}/lab5/todos/${todo.id}/delete`,
      { method: "GET" }
    );
    const todos = await response.json();
    setTodos(todos);
  };

  const postTodo = async () => {
    const response = await fetch(`${HTTP_SERVER}/lab5/todos/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Posted Todo",
        completed: false,
      }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (todo: any) => {
    const response = await fetch(
      `${HTTP_SERVER}/lab5/todos/${todo.id}`,
      { method: "DELETE" }
    );
    const todos = await response.json();
    setTodos(todos);
  };

  const updateTodo = async (todo: any) => {
    const response = await fetch(
      `${HTTP_SERVER}/lab5/todos/${todo.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      }
    );
    const updatedTodos = await response.json();
    setTodos(updatedTodos);
  };

  return (
    <div id="wd-working-with-arrays-asynchronously">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>Fetching Arrays</h4>
      <button onClick={fetchTodos} className="btn btn-primary me-2 mb-2">
        Fetch Todos
      </button>
      <button onClick={postTodo} className="btn btn-success me-2 mb-2">
        Post Todo
      </button>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
              className="form-check-input me-2"
            />
            {todo.title}
            <button
              onClick={() => removeTodo(todo)}
              className="btn btn-danger btn-sm float-end ms-2"
            >
              Remove
            </button>
            <button
              onClick={() => deleteTodo(todo)}
              className="btn btn-warning btn-sm float-end ms-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}

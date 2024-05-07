import React from 'react'

export default function Todo() {
  var todos = [{ id: 1, content: "Buy Milk", completed: false }, { id: 2, content: "Buy Bread", completed: false }];
  return (
    <>
      <h1>Todos Page</h1>

      <form>
        <input type="text" name='content' placeholder="Write your todo..." required />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </>
  )
}
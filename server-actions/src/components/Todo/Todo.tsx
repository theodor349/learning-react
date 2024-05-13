import React from 'react'
import PocketBase from "pocketbase"
import { revalidatePath } from 'next/cache';

type Todo = {
  id: string;
  name: string;
}

async function getTodos(){
  const pb = new PocketBase('http://127.0.0.1:8090');
  const todos = await pb.collection('todos').getList<Todo>(1,50);
  return todos?.items as Todo[];
}

export default async function Todo() {
  const todos = await getTodos();
  console.log(todos);

  const addTodo = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    
    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.collection('todos').create({name});
    revalidatePath('/todo');
  }
  return (
    <>
      <h1>Todos Page</h1>

      <form action={addTodo}>
        <input type="text" name='name' placeholder="Write your todo..." required />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  )
}
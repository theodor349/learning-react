import React from 'react'
import PocketBase from "pocketbase"
import Form from './Form';

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

  return (
    <>
      <h1>Todos Page</h1>
      <Form todos={todos}/>
    </>
  )
}
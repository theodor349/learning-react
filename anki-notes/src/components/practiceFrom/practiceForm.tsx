'use client';

import React, { useOptimistic } from 'react'
import { addTodo } from "@/actions/actions";
import Button from "@/components/Todo/Button";

type Todo = {
  id: string;
  name: string;
}

type props = {
  todos: Todo[];
}

export default async function Todo({ todos }: props) {
  const ref = React.useRef<HTMLFormElement>(null);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos, 
    (state, newTodo: Todo) => {
      return [...state, newTodo];
    }
  );

  return (
    <>
      <form ref={ref} 
        action={async (formData: FormData) => {
          ref.current?.reset();

          if(formData.get('name') === '') 
            return alert('Please write your todo...');

          setOptimisticTodos({id: Math.random().toString(), name: formData.get('name') as string});

          const error = await addTodo(formData)
          if(error) 
            alert('An error occurred while adding todo: ' + error);
        }}
      >
        <input type="text" name='name' placeholder="Write your todo..." />
        <Button/>
      </form>

      <ul>
      {optimisticTodos?.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
      </ul>
    </>
  )
}
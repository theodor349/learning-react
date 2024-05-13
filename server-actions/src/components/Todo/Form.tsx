"use client";

import React from 'react'
import { addTodo } from "@/actions/actions";
import Button from "@/components/Todo/Button";

export default async function Todo() {
  const ref = React.useRef<HTMLFormElement>(null);
  return (
    <form ref={ref} action={async (formData: FormData) => {
      ref.current?.reset();

      if(formData.get('name') === '') 
        return alert('Please write your todo...');

      const error = await addTodo(formData)
      if(error) 
        alert('An error occurred while adding todo: ' + error);
    }}>
      <input type="text" name='name' placeholder="Write your todo..." />
      <Button/>
    </form>
  )
}
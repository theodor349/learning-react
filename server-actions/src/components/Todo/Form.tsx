"use client";

import React from 'react'
import { addTodo } from "@/actions/actions";

export default async function Todo() {
  const ref = React.useRef<HTMLFormElement>(null);
  return (
    <form ref={ref} action={async (formData: FormData) => {
      ref.current?.reset();

      if(formData.get('name') === '') 
        return alert('Please write your todo...');

      await addTodo(formData)
    }}>
      <input type="text" name='name' placeholder="Write your todo..." />
      <button type="submit">Add</button>
    </form>
  )
}
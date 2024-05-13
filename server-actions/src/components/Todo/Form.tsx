"use client";

import React from 'react'
import { addTodo } from "@/actions/actions";

export default async function Todo() {
  return (
    <form action={addTodo}>
      <input type="text" name='name' placeholder="Write your todo..." required />
      <button type="submit">Add</button>
    </form>
  )
}
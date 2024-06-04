"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

type Props = {
}


export default function OutOfCards({}: Props) {
  return (
    <div>
      <h1>Looks like you are out of Cards to practice today 🥳</h1>
      <h1>You can check in tomorrow to see if you have new cards.</h1>
    </div>
  )
}
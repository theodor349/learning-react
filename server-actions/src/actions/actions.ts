"use server";

import { revalidatePath } from "next/cache";
import PocketBase from "pocketbase"

export const addTodo = async (formData: FormData) => {
  const name = formData.get("name") as string;
  
  try{
    throw new Error('Not implemented');
    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.collection('todos').create({name});
    revalidatePath('/todo');
  }
  catch(e){
    return e.message;
  }
}

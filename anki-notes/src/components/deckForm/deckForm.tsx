"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from 'react'
import { createDeck } from "@/actions/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function DeckForm() {
  return (
    <form action={createDeck}>
      <Card>
        <CardHeader><strong>Create New Deck</strong></CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Name</Label>
            <Input type="text" id="name" name='name' placeholder="My awesome deck" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label>Description</Label>
            <Input type="text" id="description" name='description' placeholder="Contains awesome cards" />
          </div>
        </CardContent>
        <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
          <Button type='submit'>Create Deck</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
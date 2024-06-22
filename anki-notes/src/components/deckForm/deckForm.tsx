"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from 'react'
import { createDeck, updateDeck } from "@/actions/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Deck } from '@prisma/client';

interface Props {
  deck?: Deck
}

export default function DeckForm({deck}: Props) {
  if (deck) {
    return UpdateDeckForm(deck)
  } else {
    return CreateDeckForm()
  }
}

function UpdateDeckForm(deck: Deck) {
  return (
    <form>
      <Card>
        <CardHeader><strong>Create New Deck</strong></CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Name</Label>
            <Input type="text" id="name" name='name' placeholder="My awesome deck" defaultValue={deck.name}/>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label>Description</Label>
            <Input type="text" id="description" name='description' placeholder="Contains awesome cards" defaultValue={deck.description ? deck.description : ""} />
          </div>
        </CardContent>
        <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
          <Button type='submit' formAction={async (data: FormData) => await updateDeck(data, deck)}>Update</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function CreateDeckForm() {
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
          <Button type='submit'>Create</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
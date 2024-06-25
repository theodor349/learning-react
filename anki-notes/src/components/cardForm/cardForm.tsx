"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from 'react'
import { createCard, editCard } from "@/actions/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Deck, Card as CardModel } from '@prisma/client';

interface Props {
  deck?: Deck
  card?: CardModel
}

export default function CardForm({deck, card}: Props) {
  if(deck)
    return CreateCardForm(deck);
  else if(card)
    return EditCardForm(card);
  else
    return (<div>Error, a card or deck must be supplied</div>)
}

function EditCardForm(card: CardModel) {
  return (
    <form>
      <Card>
        <CardHeader><strong>Edit Card</strong></CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Front</Label>
            <Input type="text" id="front" name='front' placeholder="What is the capital of Denmark?" defaultValue={card.front} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label>Back</Label>
            <Input type="text" id="back" name='back' placeholder="Copenhagen" defaultValue={card.back} />
          </div>
        </CardContent>
        <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
          <Button type='submit' formAction={ async (data: FormData) => await editCard(data, card)}>Edit</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function CreateCardForm(deck: Deck) {
  return (
    <form>
      <Card>
        <CardHeader><strong>Create New Card</strong></CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Front</Label>
            <Input type="text" id="front" name='front' placeholder="What is the capital of Denmark?" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label>Back</Label>
            <Input type="text" id="back" name='back' placeholder="Copenhagen" />
          </div>
        </CardContent>
        <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
          <Button type='submit' formAction={ async (data: FormData) => await createCard(data, deck)}>Create</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
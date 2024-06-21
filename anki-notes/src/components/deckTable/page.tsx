import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Deck } from "@prisma/client"

type Props = {
  decks: Deck[]
}

export default async function DeckTable({ decks } : Props) {

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={decks} />
    </div>
  )
}

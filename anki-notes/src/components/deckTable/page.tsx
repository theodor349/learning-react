import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Deck } from "@prisma/client"

type Props = {
  decks: Deck[]
}

export default async function DeckTable({ decks } : Props) {

  return (
    <div>
      <DataTable columns={columns} data={decks} />
    </div>
  )
}

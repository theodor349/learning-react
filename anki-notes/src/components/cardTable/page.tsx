import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Card } from "@prisma/client"

type Props = {
  cards: Card[]
}

export default async function CardTable({ cards } : Props) {

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={cards} />
    </div>
  )
}

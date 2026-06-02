import type { Item } from "../../types/Item.ts"

export default function ItemRow({ item }: { item: Item }) {
  return (
    <tr>
      <td> { item.category } </td>
      <td> { item.name } </td>
      <td> { item.status} </td>
      <td> { item.createdDate.toLocaleDateString() }</td>
    </tr>
  )
}
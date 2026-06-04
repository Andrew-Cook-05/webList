import type { Item } from "../../types/Item.ts"


export default function ItemRow({ item, setDeleteTarget, updateStatus }: 
  { item: Item; setDeleteTarget: React.Dispatch<React.SetStateAction<Item | null>>; updateStatus:(id: string, status: Item["status"]) => void}) {
  return (
    <tr>
      <td> { item.category } </td>
      <td> { item.name } </td>
      <td>
        <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value as Item["status"])}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </td>


      <td> { item.createdDate.toLocaleDateString() }</td>
      <td>
        <button className="button" onClick={() => setDeleteTarget(item)}>Delete</button>
      </td>
    </tr>
  )
}
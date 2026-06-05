import type { Item } from "../../types/Item.ts"
import Dropdown from "../dropdown.tsx"
import style from "../../styles/Items.module.css"


export default function ItemRow({ item, setDeleteTarget, updateStatus, selectedIds, toggleSelectedId }: 
  { item: Item; setDeleteTarget: React.Dispatch<React.SetStateAction<Item | null>>; updateStatus:(id: string, status: Item["status"]) => void;
    selectedIds: string[]; toggleSelectedId:(id: string) => void }) {
  return (
    <tr>
      <td className={style["center-text-cell"]}>
        <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectedId(item.id)}/>
      </td>
      <td> { item.category } </td>
      <td> { item.name } </td>
      <td className={style["status-cell"]}>
        <Dropdown trigger={<button className={`button ${style["status-button"]}`}>{item.status + " ▼"}</button>}>
            <button className="button" onClick={() => updateStatus(item.id, "Not Started")}>
                Not Started
            </button>

            <button className="button" onClick={() => updateStatus(item.id, "In Progress")}>
                In Progress
            </button>

            <button className="button" onClick={() => updateStatus(item.id, "Completed")}>
                Completed
            </button>
        </Dropdown>
      </td>
      <td className={style["center-text-cell"]}> { item.createdDate.toLocaleDateString() }</td>
      <td className={style["center-text-cell"]}>
        <button className={style["delete-button"]} onClick={() => setDeleteTarget(item)}>-</button>
      </td>
    </tr>
  )
}
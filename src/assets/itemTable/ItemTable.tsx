import type { Item } from "../../types/Item.ts"
import ItemRow from "./ItemRow.tsx"
import style from "../../styles/Items.module.css"

type SortBy = "name" | "category" | "status" | "date";
type Direction = "normal" | "reverse";

type ItemTableProps = {
  items: Item[];
  sortBy: SortBy;
  sortDirection: Direction;
  onSort: (type: SortBy) => void;
  setDeleteTarget: React.Dispatch<React.SetStateAction<Item | null>>;
  updateStatus: (id: string, status: Item["status"]) => void;
}

export default function ItemTable({ items, sortBy, sortDirection, onSort, setDeleteTarget, updateStatus}: ItemTableProps) {

  function getSortIcon(field: SortBy) {
    if (sortBy != field) return "";

    return sortDirection === "normal" ? "▲" : "▼";
  }
  
  if (items.length === 0) {
    return (
      <p className="standard-text">No items found.</p>
    )
  }

  const sortedItems = [...items].sort((a, b) => {
    var dir = 1;
    if (sortDirection === "reverse") {
      dir = -1;
    }
    switch (sortBy) {
      case "name":
        return dir * (a.name.localeCompare(b.name));
      case "category":
        return dir * (a.category.localeCompare(b.category));
      case "status":
        return dir * (a.status.localeCompare(b.status));
      case "date":
        return dir *(a.createdDate.valueOf() - b.createdDate.valueOf());
      default:
        return 0;
    }
  })

  return (
    <table className={style.table}>
      <colgroup>
        <col style={{ width: "20%" }}/>
        <col style={{ width: "45%" }}/>
        <col style={{ width: "15%" }}/>
        <col style={{ width: "15%" }}/>
        <col style={{ width: "5%" }}/>
      </colgroup>
      <thead>
        <tr>
          <th onClick={() => onSort("category")}>
            <div className={style["header-cell"]}>
              <span>Category</span>
              <span className={style["sort-icon"]}>{getSortIcon("category")}</span>
            </div>
          </th>
          <th onClick={() => onSort("name")}>
            <div className={style["header-cell"]}>
              <span>Name</span>
              <span className={style["sort-icon"]}>{getSortIcon("name")}</span>
            </div>
          </th>
          <th onClick={() => onSort("status")}>
            <div className={style["header-cell"]}>
              <span>Status</span>
              <span className={style["sort-icon"]}>{getSortIcon("status")}</span>
            </div>
          </th>
          <th onClick={() => onSort("date")}>
            <div className={style["header-cell"]}>
              <span>Date</span>
              <span className={style["sort-icon"]}>{getSortIcon("date")}</span>
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map(item => (<ItemRow key={item.id} item={item} setDeleteTarget={setDeleteTarget} updateStatus={updateStatus}/>))}
      </tbody>
    </table>
  )
}
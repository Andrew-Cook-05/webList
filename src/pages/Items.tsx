import { useEffect, useState } from "react"
import PageWrap from "../assets/pageWrap.tsx"
import ItemTable from "../assets/itemTable/ItemTable.tsx"
import type { Item } from "../types/Item.ts"
import { fetchItems, deleteDbItem, createDbItem } from "../api/itemsAPI.ts"
import { useAuth } from "../context/AuthContext.tsx"
import Dropdown from "../assets/dropdown.tsx"

import style from "../styles/Items.module.css"

type SortBy = "name" | "category" | "status" | "date";
type Direction = "normal" | "reverse";


export default function Items() {
  /* Choose between page mode and list mode */
  const { user } = useAuth();
  if (!user) {
    throw new Error("User should exist on protected route");
  }
  const userId = user.uid; 
  const [sortBy, setSortBy] = useState<SortBy>("category");
  const [sortDirection, setSortDirection] = useState<Direction>("normal");
  const [itemList, setItemList] = useState<Item[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({name: "", category: "", status: "Not Started" as Item["status"]});
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [addStatus, setAddStatus] = useState<Item["status"]>("Not Started");

  // API Loading
  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchItems(userId);
        setItemList(data);
      } catch {
        setError("Failed to load items");
      } finally {
        setIsLoading(false);
      }
    }

    loadItems();
  }, []);

  function handleSort(type: SortBy) {
    if (sortBy === type) {
      setSortDirection(prev => prev === "normal" ? "reverse" : "normal");
    } else {
      setSortBy(type);
      setSortDirection("normal");
    }
  }

  async function addItem(name: string, category: string, status: Item["status"]) {
    try {
      const item = await createDbItem(userId, name, category, status);
      setItemList(prev => [...prev, item])
      setIsAddOpen(false);
      setFormData({name: "", category: "", status: "Not Started"});
    } catch (error) {
      console.error(error);
      alert("Delete failed. " + error);
    }
  }

  function updateField(field: keyof typeof formData, value: string) {
    setFormData(prev => ({...prev, [field]: value}));
  }

  async function deleteItem(id: string) {
    try {
      await deleteDbItem(userId, id);
      setItemList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed. " + error);
    }
  }

  function updateStatus(id: string, status: Item["status"]) {
    setItemList(prev => prev.map(item => item.id == id ? {...item, status} : item))
  }

  useEffect(() => {
    const isModalOpen = isAddOpen || (deleteTarget !== null);
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddOpen, deleteTarget]);


  if (isLoading) {
    return (
      <PageWrap>
        <div className={style["title-container"]}>
          <h2 className={style["title-text"]}>
            Items
          </h2>
        </div>
        <div className="text-box">
          <p className="standard-text">Loading items...</p>
        </div>
      </PageWrap>
    );
  }

  if (error) {
    return (
      <PageWrap>
        <div className={style["title-container"]}>
          <h2 className={style["title-text"]}>
            Items
          </h2>
        </div>
        <div className="text-box">
          <p className="standard-text">{error}</p>
        </div>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <div className={style["title-container"]}>
        <h2 className={style["title-text"]}>
          Items
        </h2>
      </div>
      <div className={style["table-box"]}>
        <button className="button" onClick={() => setIsAddOpen(true)}>Add Item</button>
        <ItemTable items={itemList} sortBy={sortBy} sortDirection={sortDirection} onSort={handleSort} setDeleteTarget={setDeleteTarget} updateStatus={updateStatus}/>
      </div>
      {isAddOpen && (
        <div className={style["modal-overlay"]}>
          <div className={style["modal"]}>
            <h3 className="H3">Create Item</h3>
            <div className={style["modal-add-inputs"]}>
              <input className="text-input" placeholder="Category" value={formData.category} onChange={(e) => updateField("category", e.target.value)}/>
              <input className="text-input" placeholder="Name" value={formData.name} onChange={(e) => updateField("name", e.target.value)}/>
              <Dropdown trigger={<button className={`button ${style["status-button"]}`}>{addStatus + " ▼"}</button>}>
                <button className="button" onClick={() => setAddStatus("Not Started")}>
                  Not Started
                </button>

                <button className="button" onClick={() => setAddStatus("In Progress")}>
                    In Progress
                </button>

                <button className="button" onClick={() => setAddStatus("Completed")}>
                    Completed
                </button>
              </Dropdown>
            </div>
            <div className={style["modal-buttons"]}>
              <button className="button" onClick={() => addItem(formData.name, formData.category, formData.status)}>Add Item</button>
              <button className="button" onClick={() => setIsAddOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {deleteTarget !== null && (
        <div className={style["modal-overlay"]}>
          <div className={style["modal"]}>
            <h3 className="H3">Delete Item</h3>
            <p className="standard-text">Are you sure you want to delete this item?</p>
            <div className={style["modal-buttons"]}>
              <button className="button danger-button" onClick={() => {deleteItem(deleteTarget.id); setDeleteTarget(null)}}>Confirm Delete</button>
              <button className="button" onClick={() => setDeleteTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </PageWrap>
  )
}
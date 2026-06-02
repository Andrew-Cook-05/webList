import type { Item } from "../../types/Item.ts"
import ItemRow from "./ItemRow.tsx"
import styles from "../../styles/Items.module.css"

export default function ItemTable({ items }: { items: Item[]}) {
    
    if (items.length === 0) {
        return (
            <p>No items found.</p>
        )
    } 
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date Created</th>
                </tr>
            </thead>
            <tbody>
                {items.map(items => (
                    <ItemRow
                        key={items.id}
                        item={items}
                    />
                ))}
            </tbody>
        </table>
    )
}
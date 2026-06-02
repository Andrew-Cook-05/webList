import PageWrap from "../assets/pageWrap.tsx"
import items from "../data/mockItems.ts"
import ItemTable from "../assets/itemTable/ItemTable.tsx"

import styles from "../styles/Items.module.css"

export default function Items() {
  return (
    <PageWrap>
      <div className={styles["title-container"]}>
        <h2 className={styles["title-text"]}>
          Items
        </h2>
      </div>
      <div className="text-box">
        <ItemTable items={items} />
      </div>
    </PageWrap>
  )
}
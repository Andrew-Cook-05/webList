import PageWrap from "../assets/pageWrap.tsx"
import { useNavigate } from "react-router-dom";
import { useAuth, login } from "../context/AuthContext.tsx"

import styles from "../styles/Home.module.css"

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <PageWrap>
      <div className={styles["title-container"]}>
        <h1 className={styles["title-text"]}>
          Web List
        </h1>
      </div>
      { user ? (
        <button className="button" onClick={() => navigate("/items")}>Go to Lists</button>
      ) : (
        <button className="button" onClick={login}>Login</button>
      )}
      
    </PageWrap>
  )
}
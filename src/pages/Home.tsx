import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import type {User} from "firebase/auth";

import PageWrap from "../assets/pageWrap.tsx"

import styles from "../styles/Home.module.css"

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null> (null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <PageWrap>
      <div className={styles["title-container"]}>
        <h1 className={styles["title-text"]}>
          Web List
        </h1>
      </div>
    </PageWrap>
  )
}
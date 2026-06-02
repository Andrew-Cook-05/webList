import { useEffect, useState } from 'react'
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import type {User} from "firebase/auth";
import { auth, provider} from "./firebase";

import './App.css'

function login() {
  signInWithPopup(auth, provider);
}

async function logout() {
  await signOut(auth);
}

function profile() {

}

function App() {
  const [user, setUser] = useState<User | null> (null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="top-bar-container">
          {user ? (
            <button className="profile" onClick={logout}>User</button>
          ) : (
            <button onClick={login}>Login</button>
          )}

          
        </div>
        <div className="title-container">
          <h1 className="title-text">
            Web List
          </h1>
        </div>
      </div>
    </div>
  )
}

export default App

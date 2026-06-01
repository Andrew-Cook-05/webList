import { useState } from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, provider} from "./firebase";

import './App.css'

function login() {
  signInWithPopup(auth, provider);
}

function App() {

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="top-bar-container">
          <button onClick={login}>Log in with Google</button>
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

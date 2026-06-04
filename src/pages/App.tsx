import { Routes, Route } from "react-router-dom";

import '../styles/App.css'
import ProtectedRoute from "../assets/protectedRoute"

import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Items from "../pages/Items"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
      <Route path="/items" element={
        <ProtectedRoute>
          <Items />
        </ProtectedRoute>} />
    </Routes>
  );
}

export default App

import { Routes, Route, useNavigate} from "react-router-dom";

import '../styles/App.css'

import Home from "../pages/Home"
import Profile from "../pages/Profile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App

import { useEffect, useState, useRef } from 'react'
import { useAuth, login, logout } from "../context/AuthContext";
import homeIcon from "../../public/home-icon.svg"
import Dropdown from "../assets/dropdown"

import { useNavigate } from "react-router-dom";

export default function PageWrap({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="top-bar-container">
          <button className="button home-button" onClick={() => navigate("/")}>
            <img src={homeIcon} alt="Home" />
          </button>
          <div className="profile-container" ref={dropdownRef}>
            {user ? (
              <>
                <Dropdown trigger={
                  <button className="button profile-button" onClick={() => setProfileDropdownOpen(prev => !prev)}>
                    <img src={user?.photoURL ?? "Test"} alt="Profile" className="profile-image"/>
                  </button>
                }>
                  <button className="button" onClick={() => navigate("/profile")}>Profile</button>
                  <button className="button danger-button" onClick={logout}>Logout</button>
                </Dropdown>
                
                {/*profileDropdownOpen && (
                  <div className="profile-dropdown-menu">
                    <button className="button" onClick={() => navigate("/profile")}>Profile</button>
                    <button className="button danger-button" onClick={logout}>Logout</button>
                  </div>
                )*/}
              </>
            ) : (
              <button className="button" onClick={login}>Login</button>
            )}
          </div>
        </div>

        {/* Content goes here */}
        {children}

      </div>
    </div>
  )
}
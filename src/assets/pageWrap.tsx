import { useEffect, useState, useRef } from 'react'
import { useAuth, login, logout } from "../context/AuthContext";

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
          <button className="button top-bar-button" onClick={() => navigate("/")}>Home</button>
          <div className="profile-container" ref={dropdownRef}>
            {user ? (
              <>
                <button className="button top-bar-button profile-button" onClick={() => setProfileDropdownOpen(prev => !prev)}>{user.displayName}</button>
                {profileDropdownOpen && (
                  <div className="profile-dropdown-menu">
                    <button className="button profile-button" onClick={() => navigate("/profile")}>Profile</button>
                    <button className="button" onClick={logout}>Logout</button>
                  </div>
                )}
              </>
            ) : (
              <button className="button top-bar-button" onClick={login}>Login</button>
            )}
          </div>
        </div>

        {/* Content goes here */}
        {children}

      </div>
    </div>
  )
}
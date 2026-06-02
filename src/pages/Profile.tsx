import { logout } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";
import PageWrap from "../assets/pageWrap";
import style from "../styles/Profile.module.css"

export default function Profile() {
  const { user } = useAuth();
  console.log("USER:", user);
  return (
    <PageWrap>
      <h1>Profile Page</h1>
      <div className="text-box">
        {<p className="standard-text">Name: {user?.displayName ?? "No display name found"}<br />
          Email: {user?.email ?? "No email address found"}<br />
          Phone Number: {user?.phoneNumber ?? "No phone number found"}<br /><br />
        </p>}
        {<p className="standard-text" style={{ textAlign: "center"}}>All data will remain anonymous.</p>}
      </div>
      <button className={`"button" ${style["large-logout-button"]}`} onClick={logout}>Logout</button>
    </PageWrap>
  );
}
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [details, setDetails] = useState(false);
  const showUserDetails = () => {
    setDetails(!details);
  };

  return (
    <div className="navbar">
      <span className="navlogo">Ebuka Chat</span>
      <span className="user">
        <img
          src={currentUser.photoURL}
          alt="userImage"
          onClick={showUserDetails}
          onAbort={showUserDetails}
          onMouseOver={showUserDetails}
          onMouseLeave={showUserDetails}
        />
        <p
          onClick={showUserDetails}
          style={{
            cursor: "pointer",
          }}
        >
          {currentUser.displayName}
        </p>
        {details && (
          <div className="userDetails">
            <div className="userDetails-top">
              <img src={currentUser.photoURL} alt="userimg" />
              <sub> {currentUser.displayName}</sub>
            </div>

            <sub>
              {" "}
              <span>Email:</span> {currentUser.email}
            </sub>
            <button className="addNumber">Update Profile</button>
            <button onClick={() => signOut(auth)} className="logout">
              Logout
            </button>
          </div>
        )}
      </span>
    </div>
  );
};

export default Navbar;

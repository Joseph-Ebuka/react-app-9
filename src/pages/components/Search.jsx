import React, { useContext, useState } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const matchingUsers = [];

    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    const q2 = query(collection(db, "users"), where("email", "==", userName));

    // Get documents and add to array if name matches input.
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        matchingUsers.push(doc.data());
        console.log(matchingUsers);
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
    try {
      const querySnapshot = await getDocs(q2);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(user);
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handelKey = (e) => {
    e.code == "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check if the group exists if it doent exists create a new one
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
    }

    setUser(null);
    setUserName("");
    //create user cahts for jane ad john
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="search"
          placeholder="Find a user."
          onKeyDown={handelKey}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="chats" onClick={handleSelect}>
          <div className="userChat">
            <img src={user.photoURL} alt="" />
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

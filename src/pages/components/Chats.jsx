import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";
import { useSidebar } from "../../context/SideBarContext";
const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const {toggleSidebar} = useSidebar()

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    toggleSidebar()
  };
  return (
    <div className="chats">
      {chats && (
        <>
          {Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <div className="userChatDisplayName">
                  <img src={chat[1]?.userInfo?.photoURL} alt="" />
                  <span>{chat[1]?.userInfo?.displayName}</span>
                </div>

                <p>{chat[1].lastMessage?.text.slice(0, 25) + "..."}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Chats;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { sent } from "../../assets";
const Inputs = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const imgId = uuid().toString();
  const audio = new Audio(sent);

  const handleSend = async (e) => {
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, imgId);

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          // setErr(true);
        },
        () => {
          setTimeout(() => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    date: Timestamp.now(),
                    img: downloadURL,
                    senderId: currentUser.uid,
                  }),
                });
              }
            );
            audio.play();
          }, 1000);
        }
      );
    } else {
      if (text !== "") {
        audio.play();
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        
      } else {
        alert("can not send an empty text please input text");
      }
    }

    setText("");

    setImg(null);
  };

  const handleTyping = () => {
    setIsTyping(true); // User starts typing
    // Update Firebase with the user's typing status
    const chatRef = doc(db, "chats", data.chatId);
    updateDoc(chatRef, {
      typing: {
        [currentUser.uid]: true,
      },
    });
    // Use a timer or other logic to set isTyping to false when the user stops typing
  };
  // Listen for typing status changes for other users
  const listenForTypingStatus = () => {
    const chatRef = doc(db, "chats", data.chatId);
    onSnapshot(chatRef, (snapshot) => {
      const typingStatus = snapshot.data()?.typing || {};
      // Check if any other users are typing
      const otherUsersTyping = Object.keys(typingStatus).filter(
        (userId) => userId !== currentUser.uid && typingStatus[userId]
      );
      setIsTyping(otherUsersTyping.length > 0);
    });
  };
  listenForTypingStatus();
  return (
    <form>
      <div className="inputs">
        <input
          type="text"
          placeholder={isTyping ? "Someone is typing..." : "Send your message"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck="false"
          onFocus={handleTyping}
          onBlur={() => setIsTyping(false)}
        />

        <div className="send">
          <img src="" alt="" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1000/1000895.png"
              alt=""
            />
          </label>
          <button onClick={handleSend} onKeyDown={handleSend}>
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default Inputs;

import React, { useContext } from "react";
import Messages from "./Messages";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>
          <img src={data?.user.photoURL} alt="" /> {data?.user.displayName}
        </span>
        <div className="chatIcons">
          <img
            src="https://cdn-icons-png.flaticon.com/128/711/711191.png"
            alt=""
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/748/748137.png"
            alt=""
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/3018/3018442.png"
            alt=""
          />
        </div>
      </div>
      <Messages />
    </div>
  );
};

export default Chat;

import React, { useContext } from "react";
import Messages from "./Messages";
import { ChatContext } from "../../context/ChatContext";
import ToogleButton from "./ToogleButton";
import { useSidebar } from "../../context/SideBarContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { isSidebarVisible } = useSidebar();
  return (
    <div className={`chat ${isSidebarVisible && "dontShowChat"}`}>
      <div className="chatInfo">
        <span>
          <ToogleButton /> <img src={data?.user.photoURL} alt="" />{" "}
          {data?.user.displayName}
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

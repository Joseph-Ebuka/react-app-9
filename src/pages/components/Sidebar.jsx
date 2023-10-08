import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { useSidebar } from "../../context/SideBarContext";

const Sidebar = () => {
  const { isSidebarVisible } = useSidebar();


  return (
   <div className={`sidebar ${isSidebarVisible ? 'show' : 'hide'}`}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;

import React from "react";
import { useSidebar } from "../../context/SideBarContext";
import { BiArrowBack } from "react-icons/bi";
const ToogleButton = () => {
    
  const { toggleSidebar } = useSidebar();
  return <BiArrowBack className="togglebutton" onClick={toggleSidebar}  style={{
    fontSize:"40px"
  }}/>;
};

export default ToogleButton;

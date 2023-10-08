import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [fullScreen, setFullScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);
  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const messageTime = message.date;
  const normalDate = new Date(messageTime * 1000); // Convert to milliseconds by multiplying by 1000

  // Days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
  ];
  const dayOfWeek = daysOfWeek[normalDate.getDate()]; // Get the day of the week

  // Extracting hours and minutes
  const hours = normalDate.getHours();
  const minutes = normalDate.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12; // Handle 0 as 12

  const formattedDate = `${dayOfWeek} ${formattedHours}:${minutes} ${amOrPm}`;

  return (
    <div
      ref={ref}
      className={`message ${message.senderId == currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId == currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="displayImg"
        />
        {message.text && (
          <div>
            <p>{message.text} </p>
            <sub>{formattedDate}</sub>
          </div>
        )}
      </div>

      {message.img && (
        <>
          <div
            className={`messageContent  ${fullScreen && "fullImage"}`}
            onClick={() => setFullScreen(!fullScreen)}
          >
            {message.img && (
              <img
                src={message.img}
                alt=""
                className={`sentImg ${fullScreen && "fullImg"}`}
                style={{
                  transform: `scale(${zoomLevel})`,
                }}
              />
            )}

            <sub>{formattedDate}</sub>
          </div>
        </>
      )}
          {/* <button onClick={handleZoomOut}>Zoom out</button> */}
    </div>
  );
};
export default Message;

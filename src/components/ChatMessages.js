import React from "react";
import person from "../assets/profilePic2.jpg";
import media from "../assets/grilled_meat.jpeg";

const ChatMessages = () => {
  return (
    <div className="chatMessages owner">
      <div className="messageSenderInfo">
        <img src={person} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hi</p>
        <img src={media} alt="" />
      </div>
    </div>
  );
};

export default ChatMessages;

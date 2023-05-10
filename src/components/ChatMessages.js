import React from "react";
import person from "../assets/profilePic2.jpg";
import media from "../assets/grilled_meat.jpeg";
import useGetDocuments from "../hooks/useGetDocuments";
import { useStoreState } from "easy-peasy";

const ChatMessages = ({ message }) => {
  const { user } = useStoreState((state) => state.auth);

  console.log(message);
  return (
    <div
      className={`chatMessages ${
        user.id === message.senderId ? "owner" : null
      }`}
    >
      <div className="messageSenderInfo">
        <img src={person} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {message.text.length > 0 && <p>{message.text}</p>}

        <img src={message.image} alt="" />
      </div>
    </div>
  );
};

export default ChatMessages;

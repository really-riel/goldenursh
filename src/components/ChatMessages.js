import React from "react";
import person from "../assets/profilePic2.jpg";
import media from "../assets/grilled_meat.jpeg";

import { useStoreState } from "easy-peasy";
import { useRef } from "react";
import { useEffect } from "react";

const ChatMessages = ({ message }) => {
  const { user } = useStoreState((state) => state.auth);

  function formatTimestamp(timestamp) {
    const date = timestamp.toDate();
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} secs ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `${diffInDays} days ago`;
  }

  console.log(message);

  return (
    <div
      className={`chatMessages ${user.id === message.senderId ? "owner" : ""}`}
    >
      <div className="messageContent">
        {message.text.length > 0 && <p>{message.text}</p>}

        <img src={message.image} alt="" />
      </div>
      <div className="time">
        <span>{formatTimestamp(message.date)}</span>
      </div>
    </div>
  );
};

export default ChatMessages;

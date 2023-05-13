import React from "react";
import person from "../assets/profilePic2.jpg";
import media from "../assets/grilled_meat.jpeg";

import { useStoreState } from "easy-peasy";
import { useRef } from "react";
import { useEffect } from "react";

const ChatMessages = ({ message }) => {
  const { user } = useStoreState((state) => state.auth);

  console.log(message);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView();
  }, [message]);

  return (
    <div
      ref={ref}
      className={`chatMessages ${
        user.id === message.senderId ? "owner" : null
      }`}
    >
      <div className="messageSenderInfo">
        <img src={person} alt="" onError={(e) => (e.target.src = media)} />
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

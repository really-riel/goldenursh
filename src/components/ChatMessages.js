import React from "react";

import { useStoreState } from "easy-peasy";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const ChatMessages = ({ message }) => {
  const { user } = useStoreState((state) => state.auth);

  const msgRef = useRef();

  useEffect(() => {
    msgRef.current?.scrollIntoView();
  }, [message]);

  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    // Format the timestamp to a human-readable string
    const date = message.date.toDate();

    // Start a timer to update the elapsed time every second
    const intervalId = setInterval(() => {
      const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);
      const minutesAgo = Math.floor(secondsAgo / 60);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);
      if (secondsAgo < 60) {
        setElapsedTime(`secs ago`);
      } else if (minutesAgo < 60) {
        setElapsedTime(`${minutesAgo} min ago`);
      } else if (hoursAgo < 24) {
        setElapsedTime(`${hoursAgo} hr ago`);
      } else {
        setElapsedTime(`${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`);
      }
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(intervalId);
  }, [message.date]);

  return (
    <div
      ref={msgRef}
      className={`chatMessages ${user.id === message.senderId ? "owner" : ""}`}
    >
      <div className="messageContent">
        {message.text.length > 0 && <p>{message.text}</p>}

        <img src={message.image} alt="" />
      </div>
      <div className="time">
        <span>{elapsedTime}</span>
      </div>
    </div>
  );
};

export default ChatMessages;

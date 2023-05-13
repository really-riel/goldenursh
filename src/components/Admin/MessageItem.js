import React from "react";
import { useNavigate } from "react-router-dom";

const MessageItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="messageItem"
      onClick={() =>
        navigate("support-chat", {
          state: data,
        })
      }
    >
      <div className="imageContainer">
        <img src={data.image} alt="" />
      </div>
      <div className="messageMainContent">
        <h2>{data.name}</h2>
        <p>{data.lastMessage}</p>
      </div>
      <div className="messageStatus">{data.status}</div>
    </div>
  );
};

export default MessageItem;

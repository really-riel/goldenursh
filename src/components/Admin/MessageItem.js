import React from "react";

const MessageItem = ({ data }) => {
  return (
    <div className="messageItem">
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

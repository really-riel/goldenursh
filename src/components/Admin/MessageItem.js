import React from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/userProfile.png";

const MessageItem = ({ data }) => {
  const navigate = useNavigate();

  const truncatedText = (text, maxWords) => {
    const words = text.split(" ");

    const displayText =
      words.length > maxWords
        ? `${words.slice(0, maxWords).join(" ")}...`
        : text;
    return displayText;
  };

  return (
    <div
      className={`messageItem `}
      onClick={() =>
        navigate("support-chat", {
          state: data,
        })
      }
    >
      <div className="imageContainer">
        <img src={data.image ? data.image : profileImg} alt="customerImage" />
      </div>
      <div className="messageMainContent">
        <p className="name">{data.name}</p>
        <p className="lastMessage">{truncatedText(data.lastMessage, 10)}</p>
      </div>
      <div className={`messageStatus ${data.status.toLowerCase()}`}>
        {data.status === "pending" ? "Respond" : "Responded"}
      </div>
    </div>
  );
};

export default MessageItem;

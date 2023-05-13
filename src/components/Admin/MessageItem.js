import React from "react";
import { useNavigate } from "react-router-dom";

const MessageItem = ({ data, className }) => {
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
      className={`messageItem ${className}`}
      onClick={() =>
        navigate("support-chat", {
          state: data,
        })
      }
    >
      <div className="imageContainer">
        <img src={data.image} alt="customerImage" />
      </div>
      <div className="messageMainContent">
        <p className="name">{data.name}</p>
        <p className="lastMessage">
          {truncatedText(
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nisi exercitationem mollitia, perspiciatis sit dolorem laboriosam pariatur deserunt debitis voluptates id accusantium impedit dolor cum. Mollitia eum dolor vero ullam? ",
            10
          )}
        </p>
      </div>
      <div className={`messageStatus ${data.status.toLowerCase()}`}>
        {data.status === "pending" ? "Respond" : "Responded"}
      </div>
    </div>
  );
};

export default MessageItem;

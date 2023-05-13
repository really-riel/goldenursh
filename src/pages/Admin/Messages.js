import React, { useEffect, useState } from "react";
import useGetDocuments from "../../hooks/useGetDocuments";
import useGetCollection from "../../hooks/useGetCollection";
import MessageItem from "../../components/Admin/MessageItem";

const Messages = () => {
  const { docItems, isLoading } = useGetCollection("userChat");
  const [selectedOption, setSelectedOption] = useState("all chats");
  const [data, setData] = useState(null);

  useEffect(() => {
    selectedOption === "responded"
      ? setData([])
      : selectedOption === "pending"
      ? setData([])
      : setData(docItems);
  }, [docItems]);

  const handleSelect = (e) => {
    setSelectedOption(e.target.innerText.toLowerCase());
  };

  const handleClearMessages = () => {
    //do
  };

  return (
    <main className="Messages">
      <section className="mainMessagesContainer">
        <h2>Messages</h2>
        <p>
          Respond to messages and
          <br /> complaints from customers here
        </p>
        <div className="messagesContainer">
          <div className="filterOptionsContainer">
            <div
              className={`filterOptions ${
                selectedOption === "all chats" ? "selected" : null
              }`}
              onClick={handleSelect}
            >
              All Chats
            </div>
            <div
              className={`filterOptions ${
                selectedOption === "responded" ? "selected" : null
              }`}
              onClick={handleSelect}
            >
              Responded
            </div>
            <div
              className={`filterOptions ${
                selectedOption === "pending" ? "selected" : null
              }`}
              onClick={handleSelect}
            >
              Pending
            </div>
          </div>
          <p className="briefing">You have 5 pending Messages to respond to</p>

          {isLoading && !data ? (
            <div className="loading">
              <h2>loading...</h2>
            </div>
          ) : !isLoading && data ? (
            <>
              {" "}
              <div className="messages">
                {data
                  .sort((a, b) => b.date - a.date)
                  .map((data, index) => (
                    <MessageItem
                      key={index}
                      data={data}
                      className={data.length > 1 ? "line" : null}
                    />
                  ))}
              </div>
              <button className="clearAllMsgsBtn" onClick={handleClearMessages}>
                Clear all
              </button>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default Messages;

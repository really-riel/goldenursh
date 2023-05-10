import React, { useEffect, useState } from "react";
import ChatMessages from "../../components/ChatMessages";
import { TbSend } from "react-icons/tb";
import { BsImages } from "react-icons/bs";
import { useStoreState } from "easy-peasy";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import Loader from "../../components/Loader";
import { db } from "../../utils/firebase";
import { toast } from "react-toastify";
import {
  checkIfUserChatDoesNotExistAndSetUserChatToDb,
  getAdminId,
} from "../../utils/firebaseFunctions";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatImageFile, setChatImageFile] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const { user } = useStoreState((state) => state.auth);
  console.log(user);

  useEffect(() => {
    setIsInitialLoading(true);
    const preLoadFunctions = async () => {
      try {
        await checkIfUserChatDoesNotExistAndSetUserChatToDb();
        const {} = getAdminId(user);
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("an error occured, reload Page");
        setIsInitialLoading(false);
      }
    };
    preLoadFunctions();
  }, []);
  return (
    <main className="Chat">
      {isInitialLoading && <Loader />}
      <div className="mainChatContainer">
        <section className="chatBox">
          <ChatMessages />
        </section>
        <section className="inputSection">
          <form className="inputForm">
            <label htmlFor="chatInput" className="chatInputMsgLabel">
              Enter Message
            </label>
            <input
              id="chatInput"
              type="text"
              placeholder="Send us a message"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <label htmlFor="chatInputMedia" className="chatInputFileLabel">
              <BsImages />
            </label>
            <input
              id="chatInputMedia"
              type="file"
              className="chatFileInput"
              accept="image/*"
              onChange={(e) => setChatImageFile(e.target.files[0])}
            />

            <button className="sendMsgBtn">
              <TbSend />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Chat;

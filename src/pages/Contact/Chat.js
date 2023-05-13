import React, { useEffect, useState } from "react";
import ChatMessages from "../../components/ChatMessages";
import { TbSend } from "react-icons/tb";
import { BsImages } from "react-icons/bs";
import { useStoreRehydrated, useStoreState } from "easy-peasy";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import Loader from "../../components/Loader";
import { db, storage } from "../../utils/firebase";
import { toast } from "react-toastify";
import {
  checkIfUserChatDoesNotExistAndSetUserChatToDb,
  checktAndSetUserChatMessages,
} from "../../utils/firebaseFunctions";
import useGetDocuments from "../../hooks/useGetDocuments";
import { v4 as randomId } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRef } from "react";
import profileImg from "../../assets/userProfile.png";

const Chat = () => {
  const [adminId, setAdminId] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatImageFile, setChatImageFile] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isShowField, setIsShowfield] = useState(false);

  const {
    auth: { user },
    chat: { chatAdminDetails },
  } = useStoreState((state) => state);

  console.log(chatAdminDetails);

  const { document, error } = useGetDocuments(
    "chats",
    `${user.id}${chatAdminDetails.adminId}`
  );

  console.log(document, error);
  console.log(chatAdminDetails);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [document?.messages]);

  useEffect(() => {
    setIsInitialLoading(true);
    const preLoadFunctions = async () => {
      try {
        await checkIfUserChatDoesNotExistAndSetUserChatToDb(user);

        await checktAndSetUserChatMessages(user, chatAdminDetails.adminId);

        setIsShowfield(true);
        setIsInitialLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("an error occured, reload Page");
        setIsShowfield(true);
        setIsInitialLoading(false);
      }
    };
    preLoadFunctions();
  }, []);

  const handleChatMsgSubmit = async (e) => {
    e.preventDefault();

    try {
      setChatImageFile(null);
      setChatMessage("");
      if (chatImageFile) {
        await handleImageUpload();
      } else {
        if (!chatMessage) return;
        await updateDoc(
          doc(db, "chats", `${user.id}${chatAdminDetails.adminId}`),
          {
            messages: arrayUnion({
              id: randomId(),
              text: chatMessage,
              senderId: user.id,
              date: Timestamp.now(),
            }),
          }
        );

        await updateUserChat();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async () => {
    const storageRef = ref(storage, randomId());
    const uploadTask = uploadBytesResumable(storageRef, chatImageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(imageUrl);
        await updateDoc(doc(db, "chats", `${user.id}${adminId}`), {
          messages: arrayUnion({
            id: randomId(),
            text: chatMessage,
            senderId: user.id,
            date: Timestamp.now(),
            image: imageUrl,
          }),
        });
      }
    );
  };

  const updateUserChat = async () => {
    try {
      await updateDoc(doc(db, "userChat", user.id), {
        lastMessage: chatMessage,
        date: serverTimestamp(),
        status: "pending",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="Chat">
      {isInitialLoading && <Loader />}

      {isShowField && (
        <div className="mainChatContainer">
          <Link to={"/contact"}>
            <p className="backBtn">
              <MdArrowBackIos /> Back
            </p>
          </Link>
          <div className="senderDetails">
            <img
              src={
                chatAdminDetails.adminImg
                  ? chatAdminDetails.adminImg
                  : profileImg
              }
              alt=""
            />
            <div className="detailsContainer">
              <h2>{chatAdminDetails.adminName}</h2>
              <p>Support</p>
            </div>
          </div>
          <section className="chatBox" ref={containerRef}>
            {document?.messages.map((message, index) => (
              <ChatMessages message={message} key={index} />
            ))}
          </section>
          <section className="inputSection">
            <form className="inputForm" onSubmit={handleChatMsgSubmit}>
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
      )}
    </main>
  );
};

export default Chat;

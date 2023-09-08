import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import ChatMessages from "../../components/ChatMessages";
import { TbSend } from "react-icons/tb";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../../utils/firebase";
import { useStoreState } from "easy-peasy";
import { BsImages } from "react-icons/bs";
import { v4 as randomId } from "uuid";
import useGetDocuments from "../../hooks/useGetDocuments";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import profileImg from "../../assets/userProfile.png";

const SupportChat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatImageFile, setChatImageFile] = useState(null);
  const { user } = useStoreState((state) => state.auth);
  const { state } = useLocation();

  const { document, isLoading, error } = useGetDocuments("chats", state.id);

  useEffect(() => {
    if (error) toast.error("error occured, reload page 🙇‍♂️");
  }, [error]);

  const handleChatMsgSubmit = async (e) => {
    e.preventDefault();

    try {
      setChatMessage("");
      setChatImageFile(null);
      if (chatImageFile) {
        await handleImageUpload();
      } else {
        await updateDoc(doc(db, "chats", `${state.id}`), {
          messages: arrayUnion({
            id: randomId(),
            text: chatMessage,
            senderId: user.id,
            date: Timestamp.now(),
          }),
        });
      }

      await updateUserChat();
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
        await updateDoc(doc(db, "chats", `${state.id}${user.id}`), {
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
      await updateDoc(doc(db, "userChat", state.id), {
        status: "responded",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="Chat SupportChat">
      {isLoading && <Loader />}
      <div className="mainChatContainer">
        <Link to={"/admin/messages"}>
          <p className="backBtn">
            <MdArrowBackIos /> Back
          </p>
          <div className="senderDetails">
            <img src={state.image ? state.image : profileImg} alt="" />
            <h2>{state.name}</h2>
          </div>
        </Link>
        <section className="chatBox">
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
    </main>
  );
};

export default SupportChat;

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const setUsersInDatabase = async (user, name, imageUrl) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      id: Date.now(),
      name: name ? name : user.displayName,
      email: user.email,
      phone: user.phoneNumber,
      image: imageUrl ? imageUrl : user.photoURL,
      timeStamp: serverTimestamp(),
      address: "",
    });
  } catch (error) {
    console.error(error);
  }
};

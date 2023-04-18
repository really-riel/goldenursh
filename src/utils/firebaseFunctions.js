import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const setUsersInDatabase = async (user, name, imageUrl) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
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

export const pushOrdersToDatabase = async (id, ordersObj) => {
  try {
    await setDoc(doc(db, "orders", id), {
      id: Date.now(),
      orderItems: ordersObj.orderItems,
      subTotal: ordersObj.subTotal,
      deliveryFee: ordersObj.deliveryFee,
      total: ordersObj.total,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

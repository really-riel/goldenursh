import {
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
import { db } from "./firebase";
import { useState } from "react";

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

export const updateAdminLastLogin = async (id) => {
  try {
    await updateDoc(doc(db, "admin", id), {
      lastLogin: serverTimestamp(),
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
      address: ordersObj.address,
      orderStatus: ordersObj.orderStatus,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const getStaffId = async (email) => {
  let newStaffId;
  let newStaffImage;
  let errorMsg;
  try {
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      errorMsg = "you can only add registered users to the staff list";
    }
    querySnapshot.forEach((doc) => {
      newStaffId = doc.data().id;
      newStaffImage = doc.data().image;
    });
  } catch (error) {
    console.error(error);
  }
  return { newStaffId, newStaffImage, errorMsg };
};

export const checkIfUserChatDoesNotExistAndSetUserChatToDb = async (user) => {
  console.log(user);
  try {
    const res = await getDoc(doc(db, "userChat", user.id));
    if (!res.exists()) {
      await setDoc(doc(db, "userChat", user.id), {
        id: user.id,
        name: user.name,
        image: user.image,
        lastMessage: "",
        date: serverTimestamp(),
        status: "pending",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getChatAdminDetails = async (setChatAdminDetails) => {
  try {
    const q = query(collection(db, "admin"), where("role", "==", "admin"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      setChatAdminDetails({
        adminImg: data.image,
        adminId: doc.id,
        adminName: data.name,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const checktAndSetUserChatMessages = async (user, adminId) => {
  const combinedId = user.id + adminId;
  try {
    const response = await getDoc(doc(db, "chats", combinedId));
    if (!response.exists()) {
      await setDoc(doc(db, "chats", combinedId), {
        messages: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveItem = async (data, itemType) => {
  await setDoc(doc(db, itemType, `${Date.now()}`), data, { merge: true });
};

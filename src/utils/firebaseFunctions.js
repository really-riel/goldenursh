import {
  collection,
  doc,
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
    console.log(querySnapshot.empty);

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

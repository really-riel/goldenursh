import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useEffect } from "react";
import { useState } from "react";

const useGetDocuments = (collectionName, docName) => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, collectionName, docName),
      (doc) => {
        console.log(doc.data());
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return { doc, error };
};

export default useGetDocuments;

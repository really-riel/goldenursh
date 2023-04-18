import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useEffect } from "react";
import { useState } from "react";

const useGetDocuments = (collectionName, docName) => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, collectionName, docName),
      (doc) => {
        console.log(doc.data());
        setDoc(doc.data());
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return { doc, error, isLoading };
};

export default useGetDocuments;

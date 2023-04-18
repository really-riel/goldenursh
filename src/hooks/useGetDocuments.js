import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetDocuments = (collectionName, docName) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, collectionName, docName),
      (doc) => {
        setDocument(doc.data());
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
        toast.error(error.code);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return { document, error, isLoading };
};

export default useGetDocuments;

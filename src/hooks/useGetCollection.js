import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

const useGetCollection = (collectionName) => {
  const [docItems, setDocItems] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, collectionName), orderBy("id", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = [];
        snapshot.docs.forEach((doc) => {
          list.push(doc.data());
        });
        console.log(list);
        setDocItems(list);
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
        setError(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return { docItems, error, isLoading };
};

export default useGetCollection;

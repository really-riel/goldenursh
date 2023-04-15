const useGetCollection = () => {
  useEffect(() => {
    const q = query(collection(db, "foodItems"), orderBy("id", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = [];
        snapshot.docs.forEach((doc) => {
          list.push(doc.data());
        });
        setFoodItems(list);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return <div>useGetCollection</div>;
};

export default useGetCollection;

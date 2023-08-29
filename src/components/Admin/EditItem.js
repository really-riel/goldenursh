import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { storage } from "../../utils/firebase";
import { toast } from "react-toastify";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Loading from "../Loading";
import { saveEditedItem, saveItem } from "../../utils/firebaseFunctions";

const EditItem = ({ itemObject, itemType, setIsShowEditOption }) => {
  const [title, setTitle] = useState(itemObject.mainMeal);
  const [price, setPrice] = useState(itemObject.price);
  const [image, setImage] = useState(itemObject.image);
  const [isLoading, setIsLoading] = useState(false);
  console.log(itemObject);
  console.log(itemType);

  const divRef = useRef(null);

  useEffect(() => {
    // add event listener to container div
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // check if clicked element is outside the div
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsShowEditOption(false);
    }
  };

  const handleUploadImage = async (e) => {
    console.log(e.target.files[0]);
    setIsLoading(true);
    const imageFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `Images/insert${Date.now()}-${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
        toast.error("Error while uploading : Try Again 🙇‍♂️");
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(downloadUrl);
        setIsLoading(false);
        toast.success("Image uploaded successfully 😊");
      }
    );
  };

  const handleDeleteImg = async () => {
    setIsLoading(true);
    try {
      const deleteRef = ref(storage, image);

      await deleteObject(deleteRef);
      setImage(null);
      setIsLoading(false);
      toast.success("image deleted successfully 😊");
    } catch (error) {
      toast.error("Error while deleting : Try Again 🙇‍♂️");
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!title || !image || !price) {
        toast.error("Required fields can't be empty");

        return;
      }
      const data = {
        id: itemObject.id,
        mainMeal: title,
        drink: title,
        image: image,
        extra: "plus a drink",
        price,
        rating: 5,
        category: "Trending Orders",
        quantity: 1,
      };

      await saveEditedItem(data, itemType);

      setIsLoading(false);
      toast.success("Data Edited successfully 😊");
      clearData();
      setIsShowEditOption(false);
    } catch (error) {
      console.log(error);
      toast.error("Error while uploading : Try Again 🙇‍♂️");
    }
  };

  const clearData = () => {
    setTitle("");
    setImage(null);
    setPrice("");
  };

  return (
    <section className="AddNewItem EditItem">
      <div className="formWrapper" ref={divRef}>
        <div className="header">
          <h1>Edit {itemType === "dishes" ? "Dish" : "Drink"} </h1>
        </div>
        <form action="" onSubmit={handleSaveItem}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            required
          />
          <div className="imageWrapper">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {!image ? (
                  <>
                    <label htmlFor="file">
                      <MdCloudUpload />
                      Click here to upload image
                    </label>

                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      required
                    />
                  </>
                ) : (
                  <figure className="">
                    <img src={image} alt="uploaded image" className="" />
                    <button
                      type="button"
                      className="deleteIcon"
                      onClick={handleDeleteImg}
                    >
                      <MdDelete />
                    </button>
                  </figure>
                )}
              </>
            )}
          </div>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />

          <button disabled={isLoading ? true : false}>Save</button>
        </form>
      </div>
    </section>
  );
};

export default EditItem;

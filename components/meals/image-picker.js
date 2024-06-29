"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlerPickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image selected by user." fill />
          )}
        </div>
        <input
          className={classes.input}
          id={name}
          name={name}
          type="file"
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} onClick={handlerPickClick}>
          Select Image
        </button>
      </div>
    </div>
  );
}

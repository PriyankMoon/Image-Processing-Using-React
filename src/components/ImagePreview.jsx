import React from "react";

function ImagePreview({ image }) {
  if (!image) return null;

  const imageUrl = URL.createObjectURL(image);

  return (
    <div className="container-img mt-4 text-center">
      <h3>Uploaded Image:</h3>
      <div className="img-box">
        <img id="image" src={imageUrl} alt="Uploaded preview" className="img-fluid" />
      </div>
    </div>
  );
}

export default ImagePreview;

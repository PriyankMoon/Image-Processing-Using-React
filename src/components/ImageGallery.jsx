import React from "react";

function ImageGallery({ images }) {
  const containerStyle = {
    margin: "1em", // Space between columns
    columns: "340px",
  };

  const imageStyle = {
    width: "100%", // Makes the image take full width of the column
  };

  return (
    <section style={{ padding: "0 20vh", margin: "5vmin" }}>
      <div style={containerStyle}>
        {images.map((img, idx) => (
          <div key={idx} style={{ breakInside: "avoid" }}>
            <img
              src={img.urls.small}
              alt={img.alt_description || "Image"}
              style={imageStyle}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImageGallery;

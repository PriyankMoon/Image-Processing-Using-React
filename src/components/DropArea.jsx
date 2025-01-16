import React, { useState } from "react";

function DropArea({ onImageUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) onImageUpload(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) onImageUpload(file);
  };

  return (
    <div className="box-drop">
    <div
      id="drop-area"
      className={`input-box ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag & Drop an image file here, or click to select one.</p>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileInput}
      />
      <button
      style={{width: "20vmin" , margin:"10px" , padding:"10px" , borderRadius:"50px"}}
        className="btn btn-warning"
        onClick={() => document.getElementById("file-input").click()}
      >
        Add Image
      </button>
    </div>
    </div>
  );
}

export default DropArea;

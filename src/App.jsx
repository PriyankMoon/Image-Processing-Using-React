import React, { useState } from "react";
import Header from "./components/Header";
import DropArea from "./components/DropArea";
import ImagePreview from "./components/ImagePreview";
import ClassificationResult from "./components/ClassificationResult";
import ImageGallery from "./components/ImageGallery";
import WikipediaInfo from "./components/WikipediaInfo";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [classification, setClassification] = useState(null);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [wikiInfo, setWikiInfo] = useState(null);

  const handleClear = () => {
    setImage(null);
    setClassification(null);
    setFetchedImages([]);
    setWikiInfo(null);
  };

  return (
    <div>
      <Header />
      <DropArea onImageUpload={(file) => setImage(file)} />
      <ImagePreview image={image} />
      {/* Clear Button */}
      {image && (
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>
      )}
      {image && (
        <>
          <ClassificationResult
            image={image}
            onClassify={(result) => setClassification(result)}
            onImagesFetched={(images) => setFetchedImages(images)}
            onWikiInfoFetched={(info) => setWikiInfo(info)}
          />
          <ImageGallery images={fetchedImages} />
          {/* <WikipediaInfo info={wikiInfo} /> */}
          {/* Pass the classification label as query to WikipediaInfo */}
          {classification && classification[0] && (
            <WikipediaInfo query={classification[0].className} />
          )}

        </>
      )}
    </div>
  );
}

export default App;

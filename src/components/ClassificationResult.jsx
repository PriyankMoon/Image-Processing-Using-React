import React, { useEffect, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

function ClassificationResult({ image, onClassify, onImagesFetched, onWikiInfoFetched }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!image) return;

    const classifyImage = async () => {
      setLoading(true);
      setError(null);

      try {
        // Load MobileNet model
        const model = await mobilenet.load();

        // Create an image element from the file
        const img = new Image();
        img.src = URL.createObjectURL(image);

        img.onload = async () => {
          // Classify the image
          const results = await model.classify(img);
          if (results.length > 0) {
            const bestResult = results[0];
            const representativeClass = bestResult.className || "default";

            // Pass classification result to parent
            onClassify(results);

            // Fetch images and Wikipedia info
            const images = await fetchImages(representativeClass);
            onImagesFetched(images);

            const wikiInfo = await fetchWikiInfo(representativeClass);
            onWikiInfoFetched(wikiInfo);
          } else {
            setError("No classification results found.");
          }
        };
      } catch (err) {
        console.error("Error classifying image:", err);
        setError("Error occurred while classifying the image.");
      } finally {
        setLoading(false);
      }
    };

    classifyImage();
  }, [image]);

  const fetchImages = async (query) => {
    try {
      // const accessKey = "etYXN1KUaTXTS1xoPZ5PHEIbryuJiuw4UTpXaeGVx7o";
      const accessKey = import.meta.env.VITE_API_KEY; // Use your API key securely
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
      );
      if (!response.ok) {
        throw new Error(`Unsplash API Error: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (err) {
      console.error("Error fetching images from Unsplash:", err);
      setError("Failed to fetch images from Unsplash.");
      return [];
    }
  };

  const fetchWikiInfo = async (query) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`Wikipedia API Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching Wikipedia info:", err);
      setError("Failed to fetch Wikipedia info.");
      return null;
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <p>Classification complete! Check the results below.</p>}
    </div>
  );
}

export default ClassificationResult;

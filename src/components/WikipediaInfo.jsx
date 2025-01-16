import React, { useState, useEffect } from "react";
import "./WikipediaInfo.css"
function WikipediaInfo({ query }) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchWikiInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        // Clean up the query to remove any special characters
        const cleanQuery = query.replace(/[^a-zA-Z0-9]/g, "_");
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery)}`
        );
        if (!response.ok) {
          throw new Error(`Wikipedia API error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.extract || !data.content_urls) {
          throw new Error("Incomplete Wikipedia data.");
        }
        setInfo(data);
      } catch (err) {
        console.error("Error fetching Wikipedia info:", err);
        setError("Failed to fetch Wikipedia info.");
      } finally {
        setLoading(false);
      }
    };

    fetchWikiInfo();
  }, [query]);

  if (loading) return <p>Loading Wikipedia info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!info) return <p>No information available.</p>;

  return (
    <div className="info">
      <h2>{info.title}</h2>
      <p>{info.extract}</p>
      <a href={info.content_urls.desktop.page} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
}

export default WikipediaInfo;

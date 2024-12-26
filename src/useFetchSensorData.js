// useFetchSensorData.js
import { useState, useEffect } from "react";

const useFetchSensorData = (apiUrl) => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setFeeds(result.feeds);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  return { feeds, loading };
};

export default useFetchSensorData;

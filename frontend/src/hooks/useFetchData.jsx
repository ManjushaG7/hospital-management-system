import { useEffect, useState } from "react";

const useFetchData = (apiEndpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      const url = apiEndpoint.startsWith("http")
        ? apiEndpoint
        : `${import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1"}${apiEndpoint}`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch data.");
        }

        setData(result.data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { data, loading, error };
};

export default useFetchData;

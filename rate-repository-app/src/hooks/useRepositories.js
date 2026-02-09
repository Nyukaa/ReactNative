import { useState, useEffect } from "react";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // my backend is running on my local machine, so I use the local IP address of my machine
    const response = await fetch("http://172.31.48.48:5000/api/repositories");
    const json = await response.json();

    setRepositories(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return {
    repositories,
    loading,
    refetch: fetchRepositories,
  };
};

export default useRepositories;

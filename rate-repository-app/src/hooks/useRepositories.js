import { useState, useEffect } from "react";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("http://172.31.48.48:5000/api/repositories");

  //     if (!response.ok) {
  //       throw new Error(`HTTP ${response.status}`);
  //     }

  //     const json = await response.json();
  //     setRepositories(json);
  //   } catch (e) {
  //     console.error("fetchRepositories failed:", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchRepositories = async () => {
    setLoading(true);
    console.log("repositories:", repositories);
    const json = {
      edges: [
        {
          node: {
            id: "1",
            fullName: "test/repo1",
            description: "Test repository 1",
            language: "JavaScript",
            forksCount: 120,
            stargazersCount: 1500,
            ratingAverage: 88,
            reviewCount: 10,
            ownerAvatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
          },
        },
        {
          node: {
            id: "2",
            fullName: "test/repo2",
            description: "Test repository 2",
            language: "TypeScript",
            forksCount: 50,
            stargazersCount: 200,
            ratingAverage: 72,
            reviewCount: 5,
            ownerAvatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
          },
        },
      ],
    };

    setRepositories(json);
    console.log("mock json:", json);
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

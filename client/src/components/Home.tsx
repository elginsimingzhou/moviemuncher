import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";

const Home = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:3000");
      const content = await response.json()
      setMovies(content);
      return content;
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold ml-6 mt-6">New here? Try searching for your favourite movie! 🎥🍿🥤 </h1>
      <Searchbar />

    </div>
  );
};

export default Home;

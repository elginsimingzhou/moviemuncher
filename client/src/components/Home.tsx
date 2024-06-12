import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import MovieComponent from "./MovieComponent";
import Movie from "../types/Movie";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:3000/");
      const content = await response.json();
      return setMovies(content.Search);
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold ml-6 mt-6">
        New here? Try searching for your favourite movie! 🎥🍿🥤{" "}
      </h1>
      <Searchbar />
      <ul className="flex flex-wrap">
        {movies.map((movie) => {
          return <MovieComponent movie={movie}/>;
        })}
      </ul>
    </div>
  );
};

export default Home;

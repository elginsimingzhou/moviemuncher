import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import MovieComponent from "./MovieComponent";
// import Movie from "../types/Movie";
import { useMovieContext } from "../App";

const Home = () => {
  const {movies, setMovies}= useMovieContext();

  useEffect(() => {
    const fetchMovies = async () => {
      // console.log(`Home: ${movies}`)
      if (movies.length===0) {
        const response = await fetch("http://localhost:3000/");
        const content = await response.json();
        return setMovies(content.Search);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold ml-6 mt-6">
        New here? Try searching for your favourite movie! 🎥🍿🥤{" "}
      </h1>
      <Searchbar setMovie={setMovies} />
      <ul className="flex flex-wrap">
        {movies.map((movie) => {
          return <MovieComponent key={movie.imdbID} movie={movie} />;
        })}
      </ul>
    </div>
  );
};

export default Home;

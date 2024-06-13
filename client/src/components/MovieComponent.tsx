import React from "react";
import Movie from "../types/Movie";
import { Link } from "react-router-dom";

type Props = {
  movie: Movie;
};

const MovieComponent = ({ movie }: Props) => {
  
  return (
    <li
      key={movie.imdbID}
      className="flex flex-col flex-wrap mx-8 my-8 w-[300px]"
    >
      <div className="flex items-center w-[300px] h-[400px]">
        <img
          className="object-contain max-w-[100%] max-h-full"
          src={movie.Poster}
          alt={movie.Title}
          // width="200"
          // height="600"
        ></img>
      </div>
      <Link to={`search/${movie.imdbID}`}>{movie.Title}</Link>
      <p>IMDB ID: {movie.imdbID}</p>
      <p>YEAR: {movie.Year}</p>
    </li>
  );
};

export default MovieComponent;

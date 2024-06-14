import React, { useState, useEffect } from "react";
import MovieDetail from "../types/MovieDetail";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addedFavourite } from "../api/addFavourite";
import { getMovie } from "../api/getMovie";

const MoviePage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const { imdbID } = useParams();

  const toggleIcon = (source: string) => {
    switch (source) {
      case "Rotten Tomatoes":
        return "🍅";
      case "Internet Movie Database":
        return "🎥";
      case "Metacritic":
        return "Ⓜ️";
      default:
        return "🎥";
    }
  };

  const handleAdd = async() => {
try {
      const response = await addedFavourite(movie);
      if (!response.ok){
        console.log('Fail to favourite movie')
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await getMovie(imdbID);
      setMovie(response);
    };
    fetchMovie();
  }, []);
  return (
    <div className="flex flex-col px-6 py-6">
      <img
        className="object-contain"
        src={movie?.Poster}
        alt={movie?.Title}
        width="200"
      ></img>
      <div className="flex flex-row items-center mt-4">
        <h1 className="text-2xl font-semibold">{movie?.Title}</h1>
        <button onClick={handleAdd} className="rounded-xl px-4 py-2 bg-white ml-4 text-black text-sm m-0">
          Add to Watchlist ⭐
        </button>
      </div>
      <p className="mt-2">{movie?.Plot}</p>
      <ul className="flex flex-row justify-between w-3/5 my-4">
        {movie?.Ratings.map((rating) => {
          return (
            <li key={rating.Source} className="flex justify-center py-2 px-6 border-2 rounded-xl w-[320px] hover:bg-gray-200 hover:text-black">
              {toggleIcon(rating.Source)} {rating.Source}: {rating.Value}
            </li>
          );
        })}
      </ul>
      {/* Movie Details */}
      <div className="mt-2">
        <h1 className="font-semibold text-lg">Movie details</h1>
        <div className="grid grid-rows-3 grid-flow-col mt-2 text-black">
          <div className="px-2 py-4 font-semibold bg-gray-300 border-b-2">
            Title
          </div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Runtime
          </div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Rated
          </div>
          <div className="px-2  py-4 bg-white">{movie?.Title}</div>
          <div className="px-2  py-4 bg-white">{movie?.Runtime}</div>
          <div className="px-2  py-4 bg-white">{movie?.Rated}</div>

          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Genre
          </div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            IMDB Votes
          </div>

          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            IMDB Rating
          </div>
          <div className="px-2  py-4 bg-white">{movie?.Genre}</div>
          <div className="px-2  py-4 bg-white">{movie?.imdbVotes}</div>
          <div className="px-2  py-4 bg-white">{movie?.imdbRating}</div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Box Office
          </div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Awards
          </div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Release Date
          </div>
          <div className="px-2  py-4 bg-white">{movie?.BoxOffice}</div>
          <div className="px-2  py-4 bg-white">{movie?.Awards}</div>
          <div className="px-2  py-4 bg-white">{movie?.Released}</div>
        </div>
      </div>

      {/* Cast details */}
      <div className="mt-2">
        <h1 className="font-semibold text-lg">Cast details</h1>
        <div className="grid grid-rows-3 grid-flow-col mt-2 text-black">
          <div className="px-2 py-4 font-semibold bg-gray-300 border-b-2">
            Director
          </div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Writers
          </div>
          <div className="px-2  py-4 font-semibold bg-gray-300 border-b-2">
            Actors
          </div>
          <div className="px-2  py-4 bg-white">{movie?.Director}</div>
          <div className="px-2  py-4 bg-white">{movie?.Writer}</div>
          <div className="px-2  py-4 bg-white">{movie?.Actors}</div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

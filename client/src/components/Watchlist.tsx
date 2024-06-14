import React, { useEffect, useState } from "react";
import FavouriteMovie from "../types/FavouriteMovie";
import { useAuth } from "../App";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [favourites, setFavourites] = useState<FavouriteMovie[]>([]);
  const { authenticated } = useAuth();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3000/watchlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        // console.log(response)
        if (response.ok) {
          const content = await response.json();
          // console.log(`content: ${content}`)
          setFavourites(content);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFavourites();
  }, []);

  const handleRemove = async (favourite: FavouriteMovie) => {
    const response = await fetch(
      `http://localhost:3000/watchlist/delete-favourite/${favourite.Title}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favourite),
        credentials: "include",
      }
    );
    const user = await response.json();
    return setFavourites(user.favourites);
  };

  return (
    <div>
      <h1 className="border-b-2 text-3xl font-semibold mx-6 mt-6">
        My watchlist
      </h1>
      {/* <ul className="flex flex-wrap">
        {movies.map((movie) => {
          return <MovieComponent movie={movie}/>;
        })}
      </ul> */}
      {authenticated ? (
        <table className="mx-6 my-4 border-2 border-black w-3/5 h-full">
          <tbody>
            <tr className="bg-gray-300 text-black">
              <th className="border-b-2 border-r-2 border-black px-2">Title</th>
              <th className="border-b-2 border-r-2 border-black px-2">
                Duration
              </th>
              <th className="border-b-2 border-black px-2 ">
                Remove from watchlist
              </th>
            </tr>
            {favourites.map((favourite: FavouriteMovie, idx: number) => {
              return (
                <tr
                  key={favourite.Title}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-200" : "bg-gray-600"
                  } ${idx % 2 === 0 ? "text-black" : "text-white"}`}
                >
                  <td className="text-center border-r-2 border-black py-4">
                    {favourite.Title}
                  </td>
                  <td className="text-center border-r-2 border-black py-4">
                    {favourite.Runtime}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        handleRemove(favourite);
                      }}
                      className="border-2 text-black "
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="mx-6 my-4 ">
          <h1 className="text-xl mb-4">You are not logged in.</h1>
          <Link
            className="text-sm py-2 px-4 rounded-xl text-white bg-[#DC5F00]"
            to="/login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;

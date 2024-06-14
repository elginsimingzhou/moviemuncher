import MovieDetail from "../types/MovieDetail";
export const addedFavourite = async (movie: MovieDetail | null) => {
  const response = await fetch(
    "http://localhost:3000/watchlist/add-favourite",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: movie?.Title,
        Runtime: movie?.Runtime,
        Poster: movie?.Poster,
      }),
      credentials: "include",
    }
  );
  return response;
};

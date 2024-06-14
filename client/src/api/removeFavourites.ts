
import FavouriteMovie from "../types/FavouriteMovie";
export const removeFavourites = async (favourite: FavouriteMovie) => {
  
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
    return user?.favourites;
};


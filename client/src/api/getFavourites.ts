export const getFavourites = async () => {
  const response = await fetch("http://localhost:3000/watchlist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};

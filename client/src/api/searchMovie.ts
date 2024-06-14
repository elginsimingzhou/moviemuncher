export const searchMovie = async (searchTerm: string) => {
  const response = await fetch(`http://localhost:3000/search/${searchTerm}`, {
    method: "POST",
  });
  const content = await response.json();
  return content.Search;
};

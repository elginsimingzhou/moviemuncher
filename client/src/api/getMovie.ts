export const getMovie = async (imdbID: string | undefined) => {
  const response = await fetch(`http://localhost:3000/search/${imdbID}`);
  const content = await response.json();
  return content
};

export const getMovies = async () => {
  // console.log(`Home: ${movies}`)
  const response = await fetch("http://localhost:3000/");
  const content = await response.json();
  return content.Search;
};

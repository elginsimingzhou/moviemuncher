import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useOutletContext } from "react-router-dom";
import Movie from "./types/Movie";

export type ContextType = {authenticated: boolean, setAuthenticated: React.Dispatch<React.SetStateAction<boolean>> };

export type MovieContext = {movies: Movie[], setMovies: React.Dispatch<React.SetStateAction<Movie[]>>}

export function useAuth() {
  return useOutletContext<ContextType>();
}

export function useMovieContext(){
  return useOutletContext<MovieContext>();
}

function App() {
  const [authenticated, setAuthenticated]=  useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  return (
    <>
      <Navbar authenticated = {authenticated} />
      <Outlet context={{authenticated, setAuthenticated, movies, setMovies}}/>
    </>
  );
}

export default App;

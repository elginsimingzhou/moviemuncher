import React, { useState } from "react";
import Movie from "../types/Movie";

interface Props {
  setMovie: React.Dispatch<React.SetStateAction<Movie[]>>
}
const Searchbar = ({setMovie} : Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/search/${searchTerm}`, {
        method: "POST",
      });
      const content = await response.json();
      setMovie(content.Search);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form
        className="flex items-center mx-12 my-12"
        onSubmit={handleSubmit}
        action="/search"
        method="post"
      >
        <label className="text-2xl mr-6" htmlFor="search">
          Search
        </label>
        <input
          className="rounded-xl py-2 px-4 w-full text-black"
          type="text"
          id="search"
          name="search"
          placeholder="eg Harry Potter"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement> ) => {setSearchTerm(e.target.value)}}
        />
      </form>
    </div>
  );
};

export default Searchbar;

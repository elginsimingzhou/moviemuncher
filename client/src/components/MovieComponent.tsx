import React from 'react'
import Movie from '../types/Movie'
import { Link } from 'react-router-dom'

type Props = {
  movie: Movie ,
};

const MovieComponent = ({movie}: Props) => {

  {console.log(JSON.stringify(movie))}
  return (
    <li key={movie.imdbID} className='flex flex-col flex-wrap mx-8 my-8 w-[200px]'>
        <img className='object-contain' src={movie.Poster} alt="Girl in a jacket" width="200" height="600" ></img>
        <Link to={`search/${movie.imdbID}`} >{movie.Title}</Link>
        <p>IMDB ID: {movie.imdbID}</p>
        <p>YEAR: {movie.Year}</p>
    </li>
  )
}

export default MovieComponent

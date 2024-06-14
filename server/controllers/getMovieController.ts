import { Request, Response } from "express";

export const getMovieController = async (req: Request, res: Response) => {
  const { imdbID } = req.params;
  // console.log(process.env.OMDB_API + `&type=movie&s=${searchTerm}`);
  const response = await fetch(process.env.OMDB_API + `&i=${imdbID}`);
  const content = await response.json();
  res.json(content);
};

import { Request, Response } from "express";

export const searchMovieController = async (req: Request, res: Response) => {
  const { searchTerm } = req.params;
  // console.log(process.env.OMDB_API + `&type=movie&s=${searchTerm}`);
  const response = await fetch(
    process.env.OMDB_API + `&type=movie&s=${searchTerm}`
  );
  const content = await response.json();
  res.json(content);
};

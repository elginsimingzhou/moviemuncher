import { Request, Response } from "express";

export const getMoviesController = async (req: Request, res: Response) => {
  const response = await fetch(process.env.OMDB_API + "&type=movie&s=batman");
  const content = await response.json();
  res.json(content);
};
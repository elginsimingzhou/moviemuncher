import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { CustomJwtPayload } from "..";



export const watchlistController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.decode(token) as CustomJwtPayload;
    // console.log(decoded.userId);
    const user = await User.findById(decoded.userId);
    console.log("watchlist");
    console.log(user?.favourites);
    res.json(user?.favourites);
  } catch (err) {
    console.log(err);
  }
};

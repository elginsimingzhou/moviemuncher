import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { CustomJwtPayload } from "..";

export const addFavouriteController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.decode(token) as CustomJwtPayload;

    const addedFavourite = req.body;
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $addToSet: { favourites: addedFavourite } },
      { safe: true, upsert: true }
    );
    console.log(user);

    if (!user) {
      res.json({ message: "Fail to favourite movie" });
    }

    if (user?.favourites.includes(addedFavourite)) {
      res.json({ message: "Movie is already on your watchlist" });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

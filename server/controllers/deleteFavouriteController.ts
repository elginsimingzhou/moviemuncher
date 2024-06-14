import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { CustomJwtPayload } from "..";

export const deleteFavouriteController = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.decode(token) as CustomJwtPayload;
    const deletedFavourite = req.body;

    const user = await User.findByIdAndUpdate(
      { _id: decoded.userId },
      { $pullAll: { favourites: [deletedFavourite] } },
      { new: true }
    );

    if (!user) {
      res.json({ message: "Fail to delete movie from favourite" });
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

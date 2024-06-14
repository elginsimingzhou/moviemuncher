import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";

const jwtSecret = process.env.JWT_SECRET as Secret;

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).exec();

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const match = await bcrypt.compare(password, user!.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  // console.log("cookie created")

  res.json(user);
};
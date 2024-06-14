import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      });

      if (!user) {
        res.status(401).json({ message: "Invalid credentials." });
      }

      res.json(user);
    } catch (err: any) {
      if (err.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

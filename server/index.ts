import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).exec();

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const match = await bcrypt.compare(password, user!.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.json(user);
});

app.post("/register", async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
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
});

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

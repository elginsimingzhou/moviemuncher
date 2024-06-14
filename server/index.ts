import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { getMoviesController } from "./controllers/getMoviesController";
import { loginController } from "./controllers/loginController";
import { registerHandler } from "./controllers/registerHandler";
import { getMovieController } from "./controllers/getMovieController";
import { searchMovieController } from "./controllers/searchMovieController";
import { watchlistController } from "./controllers/watchlistController";
import { addFavouriteController } from "./controllers/addFavouriteController";
import { deleteFavouriteController } from "./controllers/deleteFavouriteController";
import { logoutController } from "./controllers/logoutController";
// import methodOverride from 'method-override';

var corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
const PORT = 3000 || process.env.PORT;
const jwtSecret = process.env.JWT_SECRET as Secret;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

//Check if user is logged in
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    (req as CustomRequest).token = decoded;
    next();
    // return res.json(decoded);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/", getMoviesController);
app.post("/login", loginController);
app.post("/register", registerHandler);
app.get("/search/:imdbID", getMovieController);
app.post("/search/:searchTerm", searchMovieController);
app.get("/watchlist", authMiddleware, watchlistController);
app.put("/watchlist/add-favourite", authMiddleware, addFavouriteController);
app.put(
  "/watchlist/delete-favourite/:_id",
  authMiddleware,
  deleteFavouriteController
);
app.get("/logout", logoutController);

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

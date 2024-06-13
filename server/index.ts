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

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

interface CustomJwtPayload extends JwtPayload {
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

app.get("/", async (req: Request, res: Response) => {
  const response = await fetch(process.env.OMDB_API + "&type=movie&s=batman");
  const content = await response.json();
  res.json(content);
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

  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  // console.log("cookie created")

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

app.get("/search/:imdbID", async (req: Request, res: Response) => {
  const { imdbID } = req.params;
  // console.log(process.env.OMDB_API + `&type=movie&s=${searchTerm}`);
  const response = await fetch(process.env.OMDB_API + `&i=${imdbID}`);
  const content = await response.json();
  res.json(content);
});

app.post("/search/:searchTerm", async (req: Request, res: Response) => {
  const { searchTerm } = req.params;
  // console.log(process.env.OMDB_API + `&type=movie&s=${searchTerm}`);
  const response = await fetch(
    process.env.OMDB_API + `&type=movie&s=${searchTerm}`
  );
  const content = await response.json();
  res.json(content);
});

app.get("/watchlist", authMiddleware, async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.decode(token) as CustomJwtPayload;
    // console.log(decoded.userId);
    const user = await User.findById(decoded.userId);
    console.log('watchlist')
    console.log(user?.favourites)
    res.json(user?.favourites);
  } catch (err) {
    console.log(err);
  }
  // const response = await User.findById()
  // const content = await response.json();
  // res.json(content);
});

app.put(
  "/watchlist/add-favourite",
  authMiddleware,
  async (req: Request, res: Response) => {
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
  }
);

app.put(
  "/watchlist/delete-favourite/:_id",
  authMiddleware,
  async (req: Request, res: Response) => {
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
  }
);

// app.get("/token", (req: Request, res: Response, next: NextFunction) => {
//   const response = authMiddleware(req, res, next);
//   return response
// });

app.get("/logout", async (req: Request, res: Response) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });

  // res.clearCookie('token');
});

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

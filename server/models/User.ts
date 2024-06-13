import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  Title: String,
  Runtime: String,
  Poster: String,
}, { _id : false })

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: [movieSchema]
});

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  description: {
    type: String,
    default: "",
  },
  animal: {
    type: String,
    default: "",
  },
  drink: {
    type: String,
    default: "",
  },
  landscape: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("users", userSchema);
export default User;

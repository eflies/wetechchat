import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});
const schema = "auth";
const Auth = mongoose.model(schema, authSchema, schema);

export default Auth;

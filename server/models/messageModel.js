import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  messageAuthor: { type: String, required: true },
  text: { type: String, required: true },
});

const Message = mongoose.model("message", MessageSchema);
export default Message;

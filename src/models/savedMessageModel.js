import mongoose from "mongoose";

const SavedMessageSchema = mongoose.Schema({
  saver: { type: String, required: true },
  messages: [
    {
      messageAuthor: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
});

const Message = mongoose.model("savedMessages", SavedMessageSchema);
export default Message;

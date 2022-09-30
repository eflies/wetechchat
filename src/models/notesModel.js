import mongoose from "mongoose";

const NotesSchema = mongoose.Schema({
  username: { type: String, required: true },
  firstWorkshopNotes: { type: String },
  secondWorkshopNotes: { type: String },
  talentMatchingNotes: { type: String },
});

const Notes = mongoose.model("notes", NotesSchema);
export default Notes;

import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  id: String,
  zanr: {type: [String], default: [] },
  ime_knjige: String,
  autor_knjige: String,
  opis_knjige: String,
  slika: String,
  comments: { type: [String], default: [] },
  rejting: String
});

export default mongoose.model("Knjiga", bookSchema);
import mongoose from "mongoose";

const adSchema = mongoose.Schema({
  ime_knjige: String,
  autor_knjige: String,
  autor_drzava: String,
  kreator: String,
  zanr: [String],
  id: String
});

export default mongoose.model("Oglas", adSchema);
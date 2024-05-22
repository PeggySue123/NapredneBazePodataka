import mongoose from "mongoose";

const userBookSchema = mongoose.Schema({
  ime_knjige: String,
  autor_knjige: String,
  zanr: [String],
  id_korisnika: String,
  id: String
});

export default mongoose.model("UserBook", userBookSchema);
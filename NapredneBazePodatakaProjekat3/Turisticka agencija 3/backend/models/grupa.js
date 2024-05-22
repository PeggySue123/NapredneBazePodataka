import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  ime_grupe: String,
  zanrovi: {type: [String], default: []},
  aktivnost_grupe: String,
  broj_clanova: String,
  clanovi: {type: [String], default: []},
  administratori_grupe: {type: [String], default: []},
  comments: { type: [String], default: [] },
  slika: String,
  domaci_autor: Boolean,
  id: String
});

export default mongoose.model("Grupa", groupSchema);
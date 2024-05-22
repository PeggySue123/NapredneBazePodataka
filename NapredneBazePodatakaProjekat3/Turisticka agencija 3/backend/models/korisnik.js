import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  ime: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  mesto_boravka: {type: String, required: true},
  broj_telefona: {type: String, required: true},
  admin_stranice: {type: Boolean, required: true},
  odobren: {type: Boolean, required: true},
  grupe: {type: [String]}
});

export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  kreator: String,
  tekst: String,
  id_grupe: String,
  datum: {
    type: Date,
    default: new Date()
  },
  id: String
});

export default mongoose.model("Message", messageSchema);
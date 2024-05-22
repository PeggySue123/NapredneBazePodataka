import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  naslov: String,
  tekst: String,
  datum: {
    type: Date,
    default: new Date()
  },
  kreator: String,
  id: String
});

export default mongoose.model("News", newsSchema);
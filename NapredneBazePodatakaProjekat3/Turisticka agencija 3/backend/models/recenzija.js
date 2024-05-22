import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  tekst: String,
  datum: {type: Date,
    default: new Date()
  },
  kreator: String,
  knjiga: String,
  id: String
});

export default mongoose.model("Review", reviewSchema);
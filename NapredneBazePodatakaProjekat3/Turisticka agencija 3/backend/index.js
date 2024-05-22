import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adRoutes from "./routes/oglas.js";
import bookRoutes from "./routes/knjiga.js";
import groupRoutes from "./routes/grupa.js";
import newsRoutes from "./routes/novost.js";
import reviewRoutes from "./routes/recenzija.js";
import userRoutes from "./routes/korisnik.js";
import usersBooks from "./routes/knjigeKorisnika.js";
import messages from "./routes/poruka.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/ads", adRoutes);
app.use("/knjigas", bookRoutes);
app.use("/grupas", groupRoutes);
app.use("/news", newsRoutes);
app.use("/reviews", reviewRoutes);
app.use("/user", userRoutes);
app.use("/usersBooks", usersBooks);
app.use("/messages", messages);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);

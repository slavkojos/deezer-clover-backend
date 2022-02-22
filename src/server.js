import express from "express";
import cors from "cors";
import tracksRoute from "./services/tracks.js";
import listEndpoints from "express-list-endpoints";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tracks", tracksRoute);

const PORT = 3000;
console.table(listEndpoints(app));
app.listen(PORT, () => console.log("🚀 Server is running on port ", PORT));

app.on("error", (error) => console.log("🚀 Server is not running due to ", error));

import { query, Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const route = Router();

const currentWorkingFile = fileURLToPath(import.meta.url);
const currentWorkingDirectory = dirname(currentWorkingFile);
const tracksDB = join(currentWorkingDirectory, "../db/tracks.json");

route.get("/", async (req, res, next) => {
  const tracks = await fs.readJSON(tracksDB);
  res.status(200).send(tracks);
});

route.get("/sorted", async (req, res, next) => {
  try {
    const tracks = await fs.readJSON(tracksDB);
    const sortBy = req.query.sortBy;
    const order = req.query.order;
    if (sortBy === "name" && order === "asc") {
      const sortedTracks = tracks.sort((a, b) => a.title.localeCompare(b.title));
      res.status(200).send(sortedTracks);
    } else if (sortBy === "name" && order === "desc") {
      const sortedTracks = tracks.sort((a, b) => a.title.localeCompare(b.title)).reverse();
      res.status(200).send(sortedTracks);
    } else if (sortBy === "duration" && order === "asc") {
      const sortedTracks = tracks.sort((a, b) => a.duration - b.duration);
      res.status(200).send(sortedTracks);
    } else if (sortBy === "duration" && order === "desc") {
      const sortedTracks = tracks.sort((a, b) => a.duration - b.duration).reverse();
      res.status(200).send(sortedTracks);
    } else {
      //res.status(400).send({ message: "Bad request" });
    }
  } catch (error) {
    console.log(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const tracks = await fs.readJSON(tracksDB);
    const findbyID = tracks.find((track) => track.id === parseInt(req.params.id));
    if (findbyID) {
      res.status(200).send(findbyID);
    } else {
      res.status(404).send("No track with that ID");
    }
  } catch (error) {
    console.log(error);
  }
});

export default route;

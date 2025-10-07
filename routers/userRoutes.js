import express from "express";
import * as db from "../data/user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users");
});

export default router;

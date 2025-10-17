import express from "express";
import * as db from "../data/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const {name, email, password } = req.body;
  if (!name ||!email || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const user = db.getUserByMail(email);
  if (!user) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userR = db.saveUser(name, email, hashedPassword);
    return res.status(200).json(userR);
  }
  return res.status(400).json({ message: "Email alredy exists" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing some data" });
    }
    const user = db.getUserByMail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({id: user.id, email: user.email},"secret_key", {expiresIn:'10m'});
      return res.status(200).json(token);
    }
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
  }
});

export default router;

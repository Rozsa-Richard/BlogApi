import express from "express";
import * as db from "../data/user.js";
import bcrypt from "bcrypt"

const router = express.Router();

router.post("/register", async (req, res) => {
  const {name, email, password } = req.body;
  if (!name ||!email || !password) {
    return res.status(400).json({ message: "Missing some data" });
  }
  const user = db.getUserByMail(email);
  if (!user) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    db.saveUser(name,email, hashedPassword);
    return res.status(200).json({ message: "User created" });
  }
  return res.status(400).json({ message: "Ez az email már foglalt." });
});

router.post("/singin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing some data" });
    }
    const user = db.getUserByMail(email);
    if (!user) {
      return res.status(400).json({ message: "Email vagy jelszó nem egyezik!" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({ message: "Sikeres bejelentkezés!" });
    }
    return res.status(400).json({ message: "Email vagy jelszó nem egyezik!" });
  } catch (error) {
    console.log(error);
  }
});

export default router;

import { Router } from "express";
import * as db from "../data/post.js";

const router = Router();

router.get("/", (req, res) => {
  const posts = db.getPosts();
  res.status(200).json(postss);
});

router.get("/:id", (req, res) => {
  const post = db.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(post);
});

router.post("/", (req, res) => {
  const { userId, title, content } = req.body;
  if (!userId || !title || !content) {
    res.status(400).json({ message: "Missing some data" });
  }
  db.savePost(userId, title, content);
  res.status(201).json({ message: "Post created" });
});

export default router;

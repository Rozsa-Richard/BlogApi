import { Router } from "express";
import * as db from "../data/post.js";
import { getUserByMail } from "../data/user.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req, res) => {
  const posts = db.getPosts();
  res.status(200).json(posts);
});

router.get("/my", (req,res)=> {

});

function auth(res,req, next){
  const accessToken = req.headers.authorize;
  if (!accessToken){
    return res.status(401).json({message:"Unathorized"})
  }
  const token = jwt.verify(accessToken,'secret_key');
}

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
    return res.status(400).json({ message: "Missing some data" });
  }
  db.savePost(userId, title, content);
  res.status(201).json({ message: "Post created" });
});

router.put("/:id", (req, res) => {
  const post = db.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const { userId, title, content } = req.body;
  if (!userId || !title || !content) {
    return res.status(400).json({ message: "Missing some data" });
  }
  db.updatePost(post.id, userId, title, content);
  res.status(204).json();
});

router.delete("/:id", (req, res) => {
  const post = db.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  db.deletePost(post.id);
  res.status(204).json({message:"Delete succesful"})
});

export default router;

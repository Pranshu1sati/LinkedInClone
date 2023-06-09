import express from "express";
import { getFeedPosts, getUserPosts, likePost, addCom } from "../controllers/posts.js";
import verifyToken  from "../middelware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/com", verifyToken,addCom)
export default router;
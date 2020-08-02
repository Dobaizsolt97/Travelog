const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  postById,
  getSpecificPost,
  getPhoto,
} = require("../controllers/post");

//params
router.param("postId", postById);
//routes to comunicate with the api
router.get("/posts", getPosts);
router.post("/create/post", createPost);
router.get("/post/:postId", getSpecificPost);
router.get("/post/photo/:postId", getPhoto);

module.exports = router;

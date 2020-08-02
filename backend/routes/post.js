const express = require("express");
const router = express.Router();

const { getPosts, createPost } = require("../controllers/post");

router.get("/posts", getPosts);
router.post("/create/post", createPost);

module.exports = router;

const Post = require("../models/post");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
exports.getPosts = (req, res) => {
  Post.find()
    .select("-photo")
    .populate("category", "name")
    .populate("traveler", "name")
    .exec((err, success) => {
      if (err) {
        res.status(400).json({ error: "No posts were found" });
      }
      res.send(success);
    });
};

exports.createPost = (req, res) => {
  //interpreting the information sent as a form
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Error parsing the image" });
    }
    //checking for fields
    const { title, description, rating, traveler, category } = fields;
    if (!title || !description || !rating || !traveler || !category) {
      return res.status(400).json({ error: "Please include all fields" });
    }
    let post = new Post(fields);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size too big" });
      }
      post.photo.data = fs.readFileSync(file.photo.path);
      post.photo.contentType = file.photo.type;
    }
    post.save((err, newPost) => {
      if (err) {
        return res.status(400).json({ error: "Could not save the post" });
      }
      res.json(newPost);
    });
  });
};

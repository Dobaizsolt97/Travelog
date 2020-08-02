const express = require("express");
const router = express.Router();
const { getCategories, createCategory } = require("../controllers/categories");

//routes
router.get("/categories", getCategories);
router.post("/create/category", createCategory);
module.exports = router;

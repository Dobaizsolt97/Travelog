const Category = require("../models/category");

exports.getCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err || categories.length === 0) {
      return res.status(400).json({ error: "No categories were found" });
    }
    res.json(categories);
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, newCategory) => {
    if (err) {
      return res.status(400).json({ error: "Could not create a new category" });
    }
    res.json(newCategory);
  });
};

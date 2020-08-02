const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 32, trim: true },
    description: { type: String, maxlength: 200 },
    info1: { type: String },
    rating: { type: Number, required: true },
    traveler: { type: ObjectId, ref: "User", required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    photo: { data: Buffer, contentType: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

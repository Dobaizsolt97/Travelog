const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, maxlength: 32 },
    email: {
      unique: true,
      required: true,
      type: String,
      trim: true,
    },
    about: { type: String, maxlength: 32 },
    travels: { type: Array, default: [] },
    salt: { type: String },
    hashed_password: { type: String, required: true },
  },

  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this._password = password;
  this.salt = uuidv1();
  this.hashed_password = this.encryptPassword(password);
});
userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
};
module.exports = mongoose.model("User", userSchema);

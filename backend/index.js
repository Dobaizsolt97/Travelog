//Backend setup
//external requires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//importing the routes
const authRoutes = require("./routes/auth");

// internal imports
require("dotenv").config();
// initializing the application
const app = express();

// defining the server
const PORT = process.env.PORT || 7000;
//this way if we are in production we use the certain port, if not we fallback to the predefined value, 7000 here
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

//setting up external middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

//connecting to the database, using info stored in the .env so we do not reveal credentials uppon commiting to github
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

app.get("/", (req, res) => {
  res.send("Hi");
});

//routes setup
app.use("/api", authRoutes);

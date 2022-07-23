const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const path = require("path");
const Sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const fs = require("fs");
const cors = require("cors");

// db config
const db = require("./config/keys").mongoURI; 

const app = express();
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sanitize data to prevent no sql injections
app.use(Sanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Connect to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.static("./static"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
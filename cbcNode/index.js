const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
// const path = require("path");
const Sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
// const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const announcementRoutes = require("./routes/announcements");
const busStandRoutes = require("./routes/busStands");
const busRoutes = require("./routes/buses");
const routeRoutes = require("./routes/routes");
const adminRoutes = require("./routes/admin");
const commuterRoutes = require("./routes/commuter");
const feedbackRoutes = require("./routes/feedback");
const linkRoutes = require("./routes/link");
const reportingRoutes = require("./routes/reportings");

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
  .connect(process.env.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.static("./static"));

app.use("/api/auth", authRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/busStands", busStandRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/commuter", commuterRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/link", linkRoutes);
app.use("/api/reporting", reportingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

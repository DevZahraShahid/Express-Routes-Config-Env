const config = require("config");
const debug = require("debug")("app:startup");

const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");

const courses = require("./routes/courses");
const homepage = require("./routes/homepage");

const express = require("express");
const app = express();

//Custom Middleware
// app.use(logger);
// app.use(function (req, res, next) {
//   console.log("logging...");
//   next();
// });

// Built-in Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // readme.txt

// Third-party Middleware
app.use(helmet());
// app.use(morgan("tiny"));

// Environment
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // to be set
console.log(`app: ${app.get("env")}`); // by default

// To enable middleware according to the app environment
// if (app.get("env") === "development") {
//   app.use(morgan("tiny"));
//   // console.log("Morgan enabled");
//   debug("Morgan enabled");
// }

// Configuration
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`);

// Restructured in Routes folder
app.use("/", homepage);
app.use("/api/courses", courses);

// PORT
const port = process.env.port || 3000;
// listening port
app.listen(port, () => console.log(`Listening on port: ${port}..`));

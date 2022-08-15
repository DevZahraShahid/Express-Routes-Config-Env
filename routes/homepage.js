const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.send("WELCOME TO HOMEPAGE!!");
});

// route with params to get a single course
// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

// route with Query parameters
// app.get("/api/posts/:year/:month", (req, res) => {
//   // res.send(req.params); //shows the structure of the params
//   // res.send(req.params.year);
//   res.send(req.query);
// });

module.exports = router;

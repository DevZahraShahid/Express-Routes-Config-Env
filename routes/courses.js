const Joi = require("joi");
const express = require("express");
const router = express.Router();

// Middleware - to handle json
router.use(express.json());

Courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// router.get()
// GET all courses
router.get("/", (req, res) => {
  res.send(Courses);
});

// GET request handler
router.get("/:id", (req, res) => {
  const course = Courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Requested course not found!");
  res.send(course.name);
});

// router.post();
// POST request handler
router.post("/", (req, res) => {
  //Input Validation
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Name not Valid"); // REturn To prevent the rest of the function from executing
  }

  //Input Validation with Joi (not working)
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const validation = schema.validate({ course: req.body });
  // console.log(validation);
  // if (validation.error) {
  //   res.status(400).send(validation.error.details[0].message);
  //   return;
  // } else {
  const course = {
    id: Courses.length + 1,
    name: req.body.name,
  };
  Courses.push(course);
  res.send(course);
  // }
});

// router.put();
// PUT Request Handler
router.put("/:id", (req, res) => {
  // 1- Look up
  const course = Courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send("Course with given ID not found!");

  // 2- Validate
  //Manual Validation
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Name not Valid");
  }

  // 3- Update
  course.name = req.body.name;
  res.send(course);
});

// router.delete();
//DELETE Request Handler
router.delete("/:id", (req, res) => {
  // 1- Look up
  const course = Courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send("Course with given ID not found!");

  // 2- Delete
  const index = Courses.indexOf(course);
  Courses.splice(index, 1);

  res.send(course);
});

module.exports = router;

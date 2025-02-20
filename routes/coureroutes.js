const express = require("express");
const courseController = require("../controller/controllercoures");
const controlleruser =require('../controller/controlleruser')

const router = express.Router();

// Define the POST route for creating a course
router.post("/courses", courseController.createCourse);

// Define the PUT route for updating a course
router.put("/update/:courseId", courseController.updateCourse);

// Define the DELETE route for deleting a course
router.delete("/delete/:courseId", courseController.deleteCourse);
router.get("/get", courseController.getCourses);
router.post("/couresId",courseController.buyCourse)

// user
// router.post("/signup",controlleruser.signup);
// router.post("/login",controlleruser.login);

module.exports = router;

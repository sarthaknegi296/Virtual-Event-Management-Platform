const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const { registerUser, loginUser } = require("../controllers/users");
const {
  createEvent,
  updateEvents,
  registerEvents,
  getMyEvents,
  deleteEvents
} = require("../controllers/events");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/events", [verifyToken], createEvent);

router.put("/events/:id", [verifyToken], updateEvents);

router.post("/events/:id/register", [verifyToken], registerEvents);

router.get("/myevents", [verifyToken], getMyEvents);

router.delete("/events/:id", [verifyToken], deleteEvents);

module.exports = router;

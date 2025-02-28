const express = require("express");
const router = express.Router();
const moviesControllers = require("../controllers/moviesController");

// Lista routers

// INDEX

router.get("/", moviesControllers.index);

// SHOW

router.get("/:id", moviesControllers.show);

// STORE

router.post("/:id/reviews", moviesControllers.storeReview);

// DELETE

module.exports = router;

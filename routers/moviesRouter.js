const express = require("express");
const router = express.Router();
const moviesControllers = require("../controllers/moviesController");

// Lista routers

// INDEX

router.get("/", moviesControllers.index);

// SHOW

router.get("/:id", moviesControllers.show);

// DELETE

module.exports = router;

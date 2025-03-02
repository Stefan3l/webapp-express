const express = require("express");
const router = express.Router();
const moviesControllers = require("../controllers/moviesController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/image",
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Lista routers

// INDEX

router.get("/", moviesControllers.index);

// SHOW

router.get("/:id", moviesControllers.show);

// STORE Review

router.post("/:id/reviews", moviesControllers.storeReview);

// Store Movie

router.post("/", upload.single("image"), moviesControllers.storeMovie);

// DELETE

module.exports = router;

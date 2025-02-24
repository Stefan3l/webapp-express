const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = process.env;

// Routes
const moviesRouter = require("./routers/moviesRouter");

// Middlewares
app.use(express.static("public"));
app.use("/movies", moviesRouter);
app.use(cors());
app.use(express.json());

// Routes
// Import middleware to handle errors (404) (500)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

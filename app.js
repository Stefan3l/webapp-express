const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = process.env;

// Routes
const moviesRouter = require("./routers/moviesRouter");

// Middlewares
const routeNotFound = require("./middleware/routeNotFound");
const errorHandler = require("./middleware/errorsHandler");

app.use(
  cors({
    origin: process.env.FE_URL,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use("/movies", moviesRouter);

// Routes

// Middleware error 500
app.use(errorHandler);

// Middleware error 404
app.use(routeNotFound);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

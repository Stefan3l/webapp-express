const routeNotFound = (req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
    message: "Rotta Not Found",
  });
};

module.exports = routeNotFound;

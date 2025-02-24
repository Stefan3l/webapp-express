// DATABASE

const connection = require("../data/db");

// INDEX

const index = (req, res) => {
  const moviesSql = `
        SELECT movies.* , ROUND(AVG(reviews.vote),1)
        FROM movies
        JOIN reviews ON  reviews.movie_id = movies.id
        GROUP BY movies.id
    `;

  connection.execute(moviesSql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Database query failed",
      });
    res.json(results);
  });
};

// SHOW

const show = (req, res) => {
  const movieSql = `
    SELECT *
    FROM movies
    WHERE movies.id = ?`;

  const reviewsSql = `
    SELECT *
    FROM reviews
    WHERE reviews.movie_id = ?`;

  const { id } = req.params;

  connection.execute(movieSql, [id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Database query failed",
      });

    const movie = results[0];

    connection.execute(reviewsSql, [id], (err, results) => {
      if (err)
        return res.status(500).json({
          error: "Database query failed",
        });
      movie.reviews = results;
      res.json(movie);
    });
  });
};

module.exports = { index, show };

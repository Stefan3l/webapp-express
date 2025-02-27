// DATABASE

const connection = require("../data/db");

// INDEX

const index = (req, res) => {
  const moviesSql = `
       SELECT movies.* , ROUND(AVG(reviews.vote),1)  AS  vote
        FROM movies
        LEFT JOIN reviews ON  reviews.movie_id = movies.id
        GROUP BY movies.id
    `;

  connection.execute(moviesSql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Database query failed",
      });

    const movies = results.map((movie) => {
      movie.image = `http://localhost:3001/image/${movie.image}`;
      return movie;
    });

    res.json(movies);
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

    if (!movie) {
      return res.status(404).json({ error: "Movie Not Found" });
    }

    // Modifico la proprieta image
    movie.image = `http://localhost:3001/image/${movie.image}`;

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

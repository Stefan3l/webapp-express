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
        SELECT movies.* , ROUND(AVG(reviews.vote),1)  AS  avg_vote
        FROM movies
        LEFT JOIN reviews ON  reviews.movie_id = movies.id
        WHERE movies.id = ?
        GROUP BY movies.id`;

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

// STORE Review

const storeReview = (req, res) => {
  // Recupero ID
  const { id } = req.params;

  //Recupero il body della richiesta
  const { name, vote, text } = req.body;

  // Preparare la query
  const sqlReview = `
  INSERT INTO reviews (movie_id, name, vote, text)
  VALUE (?, ? , ? , ?)
  `;
  // Eseguire la query

  connection.execute(sqlReview, [id, name, vote, text], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Database query failed",
        message: `Database query failed: ${sqlReview}`,
      });
    // restituire la risposta al client
    res.status(201).json({ id: results.insertId });
  });
};

// Store Movies

const storeMovie = (req, res) => {
  // Recupero il nome dell'immagine caricata
  const image = req.file.originalname;

  // Recuperiamo il body della richiesta
  const { title, director, genre, release_year, abstract } = req.body;
  console.log(req.body);
  // Preparare la query

  const sqlAddMovie =
    "INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)";

  connection.execute(
    sqlAddMovie,
    [title, director, genre, release_year, abstract, image],
    (err, results) => {
      if (err)
        return res.status(500).json({
          error: "Database query failed",
          message: `Database query failed: ${sqlAddMovie}`,
        });
      // restituire la risposta al client
      res.status(201).json({ id: results.insertId });
    }
  );
};

module.exports = { index, show, storeReview, storeMovie };

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./movies.db');

// Import npm packet express and save in variable 'express' and create server with use of 'express'
const express = require('express');
const server = express();

// Configure server
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

// Set port for the server to listen to
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// GET function to retrieve all movies from our database file
server.get('/movies', (req, res) => {
  const sql = 'SELECT * FROM movies';
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

// GET function to retrieve movie information based on ID
server.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM movies WHERE id=${id}`;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows[0]);
    }
  });
});
  
// POST function to add a new movie into our database
server.post('/movies', (req, res) => {
  const movie = req.body;
  const sql = `INSERT INTO movies(name, year, genre, runtime, rating) VALUES 
  (?,?,?,?,?)`;

  db.run(sql, Object.values(movie), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Movie added!');
    }
  });
});

// PUT function to update pre-existing movie based on ID in database
server.put('/movies', (req, res) => {
  const bodyData = req.body;
  
  const id = bodyData.id;
  const movie = {
    name: bodyData.name,
    year: bodyData.year,
    genre: bodyData.genre,
    runtime: bodyData.runtime,
    rating: bodyData.rating
  }
  let updateString = '';
  const columnsArray = Object.keys(movie);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${movie[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ',';
  });
    
  const sql = `UPDATE movies SET ${updateString} WHERE id=${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Movie updated!');
    }
  });
});

// DELETE function to remove selected movie based on ID from the database
server.delete('/movies/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM movies WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Movie deleted!');
    }
  });
});
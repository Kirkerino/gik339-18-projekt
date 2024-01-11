DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies(
   id       INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
   name     VARCHAR(16) NOT NULL,
   year     INTEGER NOT NULL,
   genre    VARCHAR(32) NOT NULL,
   runtime  INTEGER NOT NULL,
   rating   DECIMAL(3, 1) NOT NULL
);

INSERT INTO movies(name, year, genre, runtime, rating) VALUES ('Armageddon', 1998, 'Action, Adventure, Drama', 150, 8.4);
INSERT INTO movies(name, year, genre, runtime, rating) VALUES ('Interstellar', 2014, 'Adventure, Drama, Sci-Fi', 169, 9.2);
INSERT INTO movies(name, year, genre, runtime, rating) VALUES ('Rush Hour', 1998, 'Action, Comedy', 97, 9.8);
INSERT INTO movies(name, year, genre, runtime, rating) VALUES ('Very Bad Movie', 2020, 'Horror, Comedy, Drama', 379, 1.4);
INSERT INTO movies(name, year, genre, runtime, rating) VALUES ('Average Movie', 1967, 'Sci-Fi, Animated', 322, 5.2);

SELECT * FROM movies;

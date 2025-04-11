DROP TABLE IF EXISTS users,
visited_countries;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(15) NOT NULL,
  color VARCHAR(30) NOT NULL,
  UNIQUE (name, color)
);

CREATE TABLE visited_countries(
  user_id INTEGER REFERENCES users(id),
  country VARCHAR(100) NOT NULL
);

INSERT INTO
  users (name, color)
VALUES
  ('Asher', 'mediumspringgreen'),
  ('Angela', 'teal'),
  ('Venat', 'deepskyblue');

INSERT INTO
  visited_countries (user_id, country)
VALUES
  (1, 'South Korea'),
  (1, 'United States'),
  (2, 'South Korea'),
  (2, 'United States'),
  (3, 'South Korea'),
  (3, 'United States');

SELECT
  *
FROM
  visited_countries
  JOIN users ON user_id = users.id;
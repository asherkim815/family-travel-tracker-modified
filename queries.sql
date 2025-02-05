DROP TABLE IF EXISTS users,
all_countries,
visited_countries;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(15) NOT NULL,
  color VARCHAR(30) NOT NULL,
  UNIQUE (name, color)
);

-- create table and import csv (all_countries.csv)
CREATE TABLE all_countries(
  id SERIAL PRIMARY KEY,
  country_code char(2) UNIQUE NOT NULL,
  country_name VARCHAR(100) NOT NULL
);

CREATE TABLE visited_countries(
  user_id INTEGER REFERENCES users(id),
  country_code CHAR(2) NOT NULL
);

INSERT INTO
  users (name, color)
VALUES
  ('Asher', 'mediumspringgreen'),
  ('Angela', 'teal'),
  ('Venat', 'deepskyblue');

INSERT INTO
  visited_countries (country_code, user_id)
VALUES
  ('KR', 1),
  ('US', 1),
  ('FR', 2),
  ('GB', 2),
  ('JP', 3),
  ('US', 3);

SELECT
  *
FROM
  visited_countries
  JOIN users ON user_id = users.id;
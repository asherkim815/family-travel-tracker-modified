import express from 'express';
import pg from 'pg';
import 'dotenv/config';

// configs
const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new pg.Client({
  port: process.env.PORT,
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});
db.connect();

// variable and functions
let currentUserId = await queryFistUserId();

async function queryFistUserId() {
  const result = await db.query('SELECT id FROM users ORDER BY id ASC');
  return result.rows[0].id;
}

async function queryAllUsers() {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
}

async function queryCurrentUserCountries() {
  const result = await db.query(
    'SELECT country FROM visited_countries WHERE user_id = $1',
    [currentUserId]
  );
  return result.rows.map((obj) => obj.country);
}

// endpoints
app.get('/', async (req, res) => {
  const [allUsers, currentUserCountries] = await Promise.all([
    queryAllUsers(),
    queryCurrentUserCountries(),
  ]);
  res.render('index.ejs', {
    currentUserId: currentUserId,
    allUsers: allUsers,
    currentUserCountries: currentUserCountries,
  });
});

app.post('/choose-user', (req, res) => {
  currentUserId = Number(req.body['user-id']);
  res.redirect('/');
});

app.get('/add-user', (req, res) => {
  res.render('new.ejs');
});

app.post('/add-user', async (req, res) => {
  try {
    const result = await db.query(
      'INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id',
      [req.body.name, req.body.color]
    );
    currentUserId = result.rows[0].id;
    res.redirect('/');
  } catch (error) {
    res.redirect('/');
  }
});

app.post('/remove-user', async (req, res) => {
  const result = await queryAllUsers();
  if (result.length > 1) {
    await Promise.all([
      db.query('DELETE FROM visited_countries WHERE user_id = $1', [
        req.body['user-id'],
      ]),
      db.query('DELETE FROM users WHERE id = $1', [req.body['user-id']]),
    ]);
    currentUserId = await queryFistUserId();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

app.post('/add-remove-country', async (req, res) => {
  if (req.body['add-or-remove'] === 'add') {
    try {
      await db.query(
        'INSERT INTO visited_countries (user_id, country) VALUES ($1, $2)',
        [currentUserId, req.body.country]
      );
      res.redirect('/');
    } catch (error) {
      res.redirect('/');
    }
  } else {
    try {
      await db.query(
        'DELETE FROM visited_countries WHERE user_id = $1 AND country = $2',
        [currentUserId, req.body.country]
      );
      res.redirect('/');
    } catch (error) {
      res.redirect('/');
    }
  }
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

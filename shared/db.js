// shared/db.js
const { Pool } = require('pg');

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Function to execute a query
const query = (text, params) => pool.query(text, params);

module.exports = { query };
// api/getData.js

import { Pool } from 'pg';

// Set up your Neon Postgres connection URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Set this in Vercel environment variables
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  try {
    // Query the database
    const result = await pool.query('SELECT * FROM nameSelection');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
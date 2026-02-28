import express from "express";
import pg from "pg";

const { Pool } = pg;
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 3000;

const app = express();
const pool = new Pool({
  connectionString: DATABASE_URL,
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("select now()");
    res.json({ now: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

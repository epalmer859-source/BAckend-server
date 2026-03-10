import express from "express";
import pg from "pg";

const PORT = process.env.PORT || 3000;
const pool = process.env.DATABASE_URL
  ? new pg.Pool({ connectionString: process.env.DATABASE_URL })
  : null;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/test-db", async (req, res) => {
  if (!pool) return res.status(503).json({ error: "DATABASE_URL not set" });
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

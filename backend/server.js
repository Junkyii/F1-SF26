const express = require("express");
const cors = require("cors");
const path = require("path");

const driversRouter = require("./routes/drivers");
const racesRouter = require("./routes/races");
const carRouter = require("./routes/car");
const newsRouter = require("./routes/news");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/drivers", driversRouter);
app.use("/api/races", racesRouter);
app.use("/api/car", carRouter);
app.use("/api/news", newsRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", team: "Scuderia Ferrari", year: 2024 });
});

// Note: Serving frontend static files is handled by vercel.json in production.
// This local serving logic remains for local development if needed, 
// but we'll export the app for Vercel.

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🔴 Ferrari F1 API running on http://localhost:${PORT}`);
  });
}

module.exports = app;

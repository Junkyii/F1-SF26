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

// Serve frontend build in production
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🔴 Ferrari F1 API running on http://localhost:${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const sequelize = require("./config/database");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Welcome to the Quiz App Backend");
});

// routes
app.use("/api", userRoutes);
app.use("/api", quizRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync();
    console.log("Database Synchronized");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
});

const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Quiz App Backend");
});

app.use("/api", userRoutes);
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync();
    console.log("Database Synchronized");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
});

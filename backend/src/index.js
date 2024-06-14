const express = require("express");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// konfigurasi Sequelize untuk PostgreSql
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the  Quiz App Backend");
});

app.listen(PORT, () => {
  console.log(`Server is Running on  ${PORT}`);
  // Test Koneksi ke database
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        "Connection to PostgreSQL has been established successfully."
      );
    })
    .catch((err) => {
      console.error("Unable to connect to the database: ", err);
    });
});

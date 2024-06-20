const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./Users");

const Quiz = sequelize.define(
  "Quiz",
  {
    QuizId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    QuizCode: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "UserId",
      },
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

Quiz.belongsTo(User, { foreignKey: "CreatedBy" });
User.hasMany(Quiz, { foreignKey: "CreatedBy" });

module.exports = Quiz;

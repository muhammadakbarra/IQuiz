const Quiz = require("../models/Quiz");
const { body, validationResult } = require("express-validator");

exports.createQuiz = async (req, res) => {
  const { quizCode, title, description, createdBy } = req.body;
  try {
    const quiz = await Quiz.create({
      QuizCode: quizCode,
      Title: title,
      Description: description,
      CreatedBy: createdBy,
    });
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    if (quizzes.length === 0)
      return res.status(200).json({ message: "No quizzes found" });
    res.json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  const { title, description } = req.body;
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    await quiz.update({
      Title: title,
      Description: description,
    });
    res.json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    await quiz.destroy();
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

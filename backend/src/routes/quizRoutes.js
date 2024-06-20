const express = require("express");
const quizController = require("../controllers/quizController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/quizzes", quizController.createQuiz);
router.get("/quizzes/:id", quizController.getQuiz);
router.get("/quizzes", quizController.getAllQuizzes);
router.put("/quizzes/:id", quizController.updateQuiz);
router.delete("/quizzes/:id", quizController.deleteQuiz);

module.exports = router;

const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/users", userController.createUser);
router.post("/login", userController.loginUser); // Route untuk login
router.get("/users/:id", authMiddleware, userController.getUser); // Protected route
router.get("/users", authMiddleware, userController.getAllUsers);
router.put("/users/:id", authMiddleware, userController.updateUser); // Protected route
router.delete("/users/:id", authMiddleware, userController.deleteUser); // Protected route
router.post("/change-password", userController.changePassword);

module.exports = router;

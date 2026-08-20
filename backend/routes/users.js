const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// GET all users
router.get("/", getUsers);

// GET one user
router.get("/:id", getUserById);

// UPDATE user
router.put("/:id", authMiddleware, updateUser);

// DELETE user
router.delete("/:id", authMiddleware, deleteUser);


module.exports = router;
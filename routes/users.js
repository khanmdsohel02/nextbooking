import express from "express";
import {
  deleteUser,
  getAllUsers,
  getAnUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Update  verifyUser
router.put("/:id", verifyUser, updateUser);

// Delete specific user  verifyUser
router.delete("/:id", verifyUser, deleteUser);

// Get specific user  verifyUser
router.get("/:id", verifyUser, getAnUser);

// GetAll  verifyAdmin
router.get("/", verifyAdmin, getAllUsers);

export default router;

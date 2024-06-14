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
router.put("/:id", updateUser);

// Delete specific user  verifyUser
router.delete("/:id", deleteUser);

// Get specific user  verifyUser
router.get("/:id", getAnUser);

// GetAll  verifyAdmin
router.get("/", getAllUsers);

export default router;

import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getAnRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";

const router = express.Router();

// Create verifyAdmin
router.post("/:hotelid", verifyAdmin, createRoom);

// Update   verifyAdmin
router.put("/:id", verifyAdmin, updateRoom);

// updateRoomAvailability
router.put("/availability/:id", updateRoomAvailability);

// Delete specific hotel room  verifyAdmin
router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom);

// Get specific hotel
router.get("/:id", getAnRoom);

// GetAll
router.get("/", getAllRooms);

export default router;

import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getAnHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Get Hotel count by city
router.get("/countbycity", countByCity);

// Get Hotel count by Type
router.get("/countbytype", countByType);

// Create verifyAdmin
router.post("/", createHotel);

// Update  verifyAdmin
router.put("/:id", updateHotel);

// Delete specific Hotel   verifyAdmin
router.delete("/:id", deleteHotel);

// Get specific Hotel
router.get("/:id", getAnHotel);

// GetAll
router.get("/", getAllHotels);

// Get All Hotels room
router.get("/room/:id", getHotelRooms);

export default router;

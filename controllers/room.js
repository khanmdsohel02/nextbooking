import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// createRoom
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// updateRoom
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedRoom);
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// updateRoomAvailability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// deleteRoom
export const deleteRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  const hotelId = req.params.hotelId;

  console.log("roomId", roomId);
  console.log("hotelId", hotelId);

  try {
    // Delete the room
    await Room.findByIdAndDelete(roomId);

    // Remove the room reference from the hotel
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: roomId },
    });

    // Respond with success message
    res.status(200).json({ message: "Room has been deleted." });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting room:", error);
    next(error); // Pass the error to the error handler middleware
  }
};

// get specific Room
export const getAnRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// getRooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

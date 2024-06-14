import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Create Hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

// Update Hotel
export const updateHotel = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

// Delate Hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Hotel has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Get Specific Hotel
export const getAnHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// Get All Hotels
export const getAllHotels = async (req, res, next) => {
  const { featured, limit, city, min, max } = req.query;
  const query = {};
  if (featured) query.featured = featured === "true";
  if (city) query.city = city.toUpperCase();
  if (min || max) {
    query.cheapestPrice = {};
    if (min) query.cheapestPrice.$gte = parseFloat(min);
    if (max) query.cheapestPrice.$lte = parseFloat(max);
  }

  try {
    const hotels = await Hotel.find(query).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    console.log("list", list);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

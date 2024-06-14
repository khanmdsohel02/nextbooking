import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.js";
import HotelsRoute from "./routes/hotels.js";
import UsersRoute from "./routes/users.js";
import RoomsRoute from "./routes/rooms.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = 5500;

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// DB connection
connectDB();

app.use("/api/auth", AuthRoute);
app.use("/api/users", UsersRoute);
app.use("/api/hotels", HotelsRoute);
app.use("/api/rooms", RoomsRoute);

app.get("/", (req, res) => {
  res.send("Assalamualaikum!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

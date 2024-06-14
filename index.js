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

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

// mongoose.connection.on("disconnected", () => {
//   console.log("mongoDB disconnected");
// });

// mongoose.connection.on("connected", () => {
//   console.log("mongoDB connected");
// });

app.get("/", (req, res) => {
  res.send("Assalamualaikum!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mdsoheldev
// bHVze2X51cvdtB2u

// mongodb+srv://mdsoheldev:<password>@cluster0.oblakk7.mongodb.net/?

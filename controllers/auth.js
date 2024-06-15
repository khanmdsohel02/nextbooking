import User from "../models/User.js";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// User Register
export const register = async (req, res, next) => {
  try {
    // const salt = bcrypt.genSaltSync(10);
    // const hashPassword = bcrypt.hashSync(req.body.password, salt);
    console.log("req.body", req.body);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin || false,
    });
    console.log(req.body);
    await newUser.save();
    res.status(200).json("User has been created");
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

// User Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = req.body.password === user.password;
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) return next(createError(400, "Wrong password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_Secret
    );

    const { password, isAdmin, ...othersData } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ userDetails: { ...othersData }, isAdmin });
  } catch (error) {
    next(error);
  }
};

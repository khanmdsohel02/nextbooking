import User from "../models/User.js";
import createError from "../utils/error.js";

// User Register
export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin || false,
    });

    await newUser.save();
    res.status(200).json("User has been created");
  } catch (error) {
    // console.log("error", error.message);

    next(error);
  }
};

// User Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = req.body.password === user.password;

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const { password, isAdmin, ...otherDetails } = user._doc;

    res.status(200).json({ details: { ...otherDetails, isAdmin } });
  } catch (err) {
    next(err);
  }
};

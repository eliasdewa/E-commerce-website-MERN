import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import errorHandler from "../middleware/errorHandler.js";
import { generateToken } from "../middleware/generateToken.js";

// Register new user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // Validate the data
  if (!name || !email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  if (!validator.isLength(name, { min: 2, max: 20 })) {
    return next(errorHandler("Name must be between 2 and 20 characters", 400));
  }
  if (!validator.isEmail(email)) {
    return next(errorHandler("Please enter a valid email", 400));
  }
  if (!validator.isLength(password, { min: 8, max: 30 })) {
    return next(
      errorHandler("Password must be between 8 and 30 characters", 400)
    );
  }
  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(errorHandler("Email already exists", 400));
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  // save new user
  const user = await newUser.save();
  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

// Login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate the data
  if (!email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(errorHandler("User doesn't exist", 404));
  }
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(errorHandler("Invalid Credentials", 400));
  }
  // Generate and send JWT token
  const token = await generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      profession: user.profession,
    },
  });
});

// Logout user
const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
});

// get all users
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel
    .find({}, "id email role")
    .sort({ createdAt: -1 });
  res.status(200).json(users);
});

// delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    return next(errorHandler("User not found", 404));
  }
  res.status(200).json({ message: "User deleted successfully" });
});

// update user role
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    return next(errorHandler("User not found", 404));
  }
  res.status(200).json({ message: "User role updated successfully" });
});

// edit or update user profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { userId, name, profileImage, bio, profession } = req.body;
  if (!userId) {
    return next(errorHandler("User ID is required", 400));
  }
  const user = await userModel.findById(userId);
  if (!user) {
    return next(errorHandler("User not found", 404));
  }
  // update profile
  if (name !== undefined) user.name = name;
  if (profileImage !== undefined) user.profileImage = profileImage;
  if (bio !== undefined) user.bio = bio;
  if (profession !== undefined) user.profession = profession;

  await user.save();
  res.status(200).json({ message: "User profile updated successfully", user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    bio: user.bio,
    profession: user.profession,
  }});
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserProfile,
};

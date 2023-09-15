import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

//@desc Register a user
//@route POST /api/users/register
//@access PUBLIC
export const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  try {
    const userAvailable = await UserModel.findOne({ username });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already exists");
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);
    req.body.password = hashedPasword;
    const newUser = new UserModel(req.body);
    const user = await newUser.save();

    if (user) {
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@desc login user
//@route POST /api/users/login
//@access PUBLIC
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  try {
    const user = await UserModel.findOne({ username });
    // Compare password with hashed password
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(401);
        throw new Error("UserID or Password is not valid");
      } else {
        const accessToken = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, accessToken });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

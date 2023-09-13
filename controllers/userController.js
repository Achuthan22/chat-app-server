const asyncHandler = require("express-async-handler");
const users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecert = "achuthan123";

//@desc Register a user
//@route POST /api/users/register
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { UserID, Password } = req.body;
  if (!UserID || !Password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await users.findOne({ UserID });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //Hash Password
  const hashedPasword = await bcrypt.hash(Password, 10);
  console.log(hashedPasword);

  const user = await users.create({
    UserID,
    Password: hashedPasword,
    CreatedDate: new Date(),
  });
  console.log(user);

  if (user) res.status(201).json({ _id: user.UserID });
  else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Registered successfully" });
});

//@desc login user
//@route POST /api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { UserID, Password } = req.body;
  if (!UserID || !Password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await users.findOne({ UserID });
  // Compare password with hashed password
  if (user && (await bcrypt.compare(Password, user.Password))) {
    const accessToken = jwt.sign(
      {
        user: {
          UserID: user.UserID,
        },
      },
      accessTokenSecert,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("UserID or Password is not valid");
  }
});

module.exports = { loginUser, registerUser };

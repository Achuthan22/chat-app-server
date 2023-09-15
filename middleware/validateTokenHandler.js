const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const secret = process.env.JWTKEY;

const validateToken = asyncHandler(async (req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.send(401);
        throw new Error("User is not authorized");
      }
      req.body._id = decoded?.id;
      next();
    });
    if (!token) {
      res.send(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const accessTokenSecert = "achuthan123";

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecert, (err, decoded) => {
      if (err) {
        res.send(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.send(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;

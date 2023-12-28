const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id);
        req.user = await User.findById(decoded.id).select("-password");
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again.");
    }
  } else {
    throw new Error("There is token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new Error("You are not an Admin");
  } else {
    next();
  }
});

const isPointLeader = asyncHandler(async (req, res, next) => {
  if (
    req.user.role !== "gathering point leader" &&
    req.user.role !== "head of transaction point"
  ) {
    throw new Error("You are not an point leader");
  } else {
    next();
  }
});

const isGatheringPointLeader = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "gathering point leader") {
    throw new Error("You are not an gathering point leader");
  } else {
    next();
  }
});

const isHeadOfTransactionPoint = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "head of transaction point") {
    throw new Error("You are not an head of transaction point");
  } else {
    next();
  }
});

module.exports = {
  authMiddleware,
  isAdmin,
  isPointLeader,
  isGatheringPointLeader,
  isHeadOfTransactionPoint,
};

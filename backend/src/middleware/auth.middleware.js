import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user not found",
      });
    }

    req.user = user;
    console.log(req);
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

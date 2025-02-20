import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ROLES } from "../config/roles.mjs";
dotenv.config();

export const authorize = async (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(404).send("token not found");

  try {
    const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(404).send("Token expired");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(404).send("Invalid token");
    } else {
      console.log(error);

      return res.status(404).send("Token verification failed");
    }
  }

  return next();
};

export const authorizeAdmin = (req, res, next) => {
  const { role } = req.body; //User role
  if (role != ROLES.ADMIN) {
    //User is not Admin
    return res.status(403).send("Access denied");
  } else {
    return next();
  }
};

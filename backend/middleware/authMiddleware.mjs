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
      return res.status(450).send("Token expired");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(450).send("Invalid token");
    } else {
      console.log(error);

      return res.status(450).send("Token verification failed");
    }
  }

  return next();
};

export const authorizeAdmin = (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(404).send("token not found");
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    if (req.user.role !== ROLES.ADMIN) {
      return res.status(403).send("Access denied");
    }

    return next();
  }

  catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(450).send("Token expired");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(450).send("Invalid token");
    } else {
      console.log(error);

      return res.status(450).send("Token verification failed");}
  };
}

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import authService from "../services/auth.service";
import { AuthRequest } from "../types/AuthRequest";
const secret_key = "abcdefghijklmnopqrstuvwxyz";
interface Decoded {
  email: string;
  iat: number;
  exp: number;
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.header("Authorization") ||
    !req.header("Authorization")?.startsWith("Bearer ")
  ) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  const token = req.header("Authorization")?.split(" ")[1];
  try {
    const decoded = jwt.verify(token!, secret_key) as JwtPayload & Decoded;

    const freshUser = await authService.getUserByEmail(decoded.email);
    console.log(freshUser);

    (req as AuthRequest).user = freshUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import authService from "../services/auth.service";
import { AuthRequest } from "../types/AuthRequest";
import doctorService from "../services/doctor.service";
import { DoctorRequest } from "../types/DoctorRequest";
// import { AppError } from "../utils/AppError";

const secret_key = "abcdefghijklmnopqrstuvwxyz";
interface Decoded {
  email: string;
  iat: number;
  exp: number;
}

interface Decoded2 {
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

    (req as AuthRequest).user = freshUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};
export const authenticateDoctor = async (
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
    const decoded = jwt.verify(token!, secret_key) as JwtPayload & Decoded2;

    const freshUser = await doctorService.getDoctorByEmail(decoded.email);

    (req as DoctorRequest).doctor = freshUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

// export const errorMiddleware = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Response | void => {
//   console.error("Error", err.message);

//   if (err instanceof AppError) {
//     return res.status((err as AppError).statusCode).json({
//       status: "error",
//       message: err.message,
//     });
//   }

//   res.status(500).json({
//     status: "error",
//     message: "Something went wrong",
//   });
// };

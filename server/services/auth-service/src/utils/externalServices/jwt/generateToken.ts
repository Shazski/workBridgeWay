import jwt, { Secret } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { JWT_SECRET } from "../../../config";

export const generateToken = (id: ObjectId) => {
 return jwt.sign({ id }, JWT_SECRET as Secret, { expiresIn: "20d" });
};

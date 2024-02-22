import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export const getCompanyId = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET as Secret) as { id: string };
    return payload.id;
  } catch (error) {
    console.log(error,"<< Something went wrong in getcompany id from jwt >>")
    return ""
  }

};

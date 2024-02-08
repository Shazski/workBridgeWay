import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export const getCompanyId = (token: string) => {
  const payload = jwt.verify(token, JWT_SECRET as Secret) as { id: string };

  return payload.id;
};

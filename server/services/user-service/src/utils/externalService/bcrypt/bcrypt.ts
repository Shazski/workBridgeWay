import bcrypt from "bcrypt";

export const isPasswordMatch = (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword);
};
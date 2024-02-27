import * as cloudinary from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME, JWT_SECRET } from "../../../config";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse, getUserById } from "work-bridge-way-common";

cloudinary.v2.config({
 cloud_name: CLOUD_NAME,
 api_key: API_KEY,
 api_secret: API_SECRET,
});

export default (dependencies: IDependenciesData) => {
 const {
  user_useCase: { addResume_useCase },
 } = dependencies;
 const uploadResume = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
   const token = req.cookies.auth_jwt;
   const userId = getUserById(token, JWT_SECRET!);
   console.log(req.file, "uploaded file details");

   const pdfFilePath = req.file;
   console.log(pdfFilePath, "file path");

   if (!pdfFilePath) {
    return res.status(400).send("PDF file not provided");
   }

   const pdfBuffer = pdfFilePath.buffer;

   cloudinary.v2.uploader
    .upload_stream({}, async (error, result) => {
     if (error) {
      console.log("Error in uploading PDF", error);
      return res.status(500).send("Error in uploading PDF");
     } else {
      const rawUrl = result?.url;
      const updatedUser = await addResume_useCase(dependencies).execute(
       userId,
       rawUrl
      );
      if (!updatedUser)
       return next(ErrorResponse.badRequest("Not able to add resume"));
      delete updatedUser.password;
      return res.status(200).json(updatedUser);
     }
    })
    .end(pdfBuffer);
  } catch (error) {
   console.error("Error reading PDF file:", error);
   return res.status(500).send("Error reading PDF file");
  }
 };
 return uploadResume;
};

import express from "express";

export = (dependencies: any) => {
  const router = express.Router();

  router.post("/register", (req, res) => {
    console.log("hello aim ready");
  });
  return router;
};

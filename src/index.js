// require('dotenv').config()
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is runing at Port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!", err);
  });

// first approach to to connect db in index file if we do not want to use db folder we can connect from here also with the help of below code and we also write this code on db folder in a file and import here to run and connect the database so it's the approach number 2.

/*
import express from "express";

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", () => {
      console.log("Err: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console, log(`application is listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
})();

*/

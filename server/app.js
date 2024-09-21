import express from "express";
import cors from "cors";
import { userController } from "./controllers/userController.js";

const app = express();
const port = 4000;

const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/users", userController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
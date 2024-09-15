import express from "express";
import { jwtVerify } from "@kinde-oss/kinde-node-express";
import { query } from "../shared/db.js";
import cors from "cors";

const app = express();
const port = 3001;

const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};

const dataFromDb = await query("SELECT * FROM users");
console.log(dataFromDb.rows);

const jwtVerifier = jwtVerify(`https://collablauncher.kinde.com`, {
  audience: "https://localhost:3001",
});

app.use(cors(corsOptions));

app.get("/api/protected", jwtVerifier, (req, res) => {
  console.log("Valid Token!");
  res.json({
    message: "You have accessed the protected endpoint!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

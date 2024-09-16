import express from "express";
import { jwtVerify } from "@kinde-oss/kinde-node-express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const port = 3001;

const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};

const jwtVerifier = jwtVerify(`https://collablauncher.kinde.com`, {
  audience: "https://localhost:3001",
});

const prisma = new PrismaClient();

app.use(cors(corsOptions));

app.use(express.json());

// Test endpoint
app.get("/test", (req, res) => {
  try {
    res.status(200).json({
      message: "Test Endpoint",
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred",
    });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/protected", jwtVerifier, (req, res) => {
  console.log("Valid Token!");
  res.json({
    message: "You have accessed the protected endpoint!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import { jwtVerify } from "@kinde-oss/kinde-node-express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const port = 4000;

const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};

const jwtVerifier = jwtVerify(`https://collablauncher.kinde.com`, {
  audience: "https://localhost:4000",
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
app.post("/users", jwtVerifier, async (req, res) => {
  try {
    const { id, email, username } = req.body;

    // Check if user with the same id, email, or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { id: id },
          { email: email },
          { username: username },
        ],
      },
    });

    if (existingUser) {
      console.log("User with the same id, email, or username already exists");
      return res.status(201).json({
        message: 'User with the same id, email, or username already exists',
      });
    }

    const user = await prisma.user.create({
      data: {
        id: req.body.id,
        email: req.body.email,
        username: req.body.username,
        name: `${req.body.given_name} ${req.body.family_name}`,
        picture: req.body.picture,
      },
    });

    console.log("User created successfully");
    
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//get user by id
app.get('/users/:id', jwtVerifier, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: String(req.params.id),
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
        id: String(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

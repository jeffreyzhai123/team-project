import express from 'express';
import userService from '../services/userService.js';
import { jwtVerify } from "@kinde-oss/kinde-node-express";

const router = express.Router();
const jwtVerifier = jwtVerify(`https://collablauncher.kinde.com`, {
  audience: "https://localhost:4000",
});

// Get all users
// TODO: add jwtVerifier to protect this route when deploying to production
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Create a new user
router.post("/", jwtVerifier, async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    
    if (result.alreadyExists) {
      console.log('User with the same id, email, or username already exists');
      return res.status(201).json({ message: 'User with the same id, email, or username already exists' });
    }

    console.log('User created');
    res.status(201).json(result.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user by id
// TODO: add jwtVerifier to protect this route when deploying to production
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
// TODO: add jwtVerifier to protect this route when deploying to production
router.delete("/:id", async (req, res) => {
  try {
    const user = await userService.deleteUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userController };
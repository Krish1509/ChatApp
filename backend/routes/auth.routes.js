import express from "express"; // Import Express framework
import { signup, login, logout } from "../controllers/auth.controller.js"; // Import controller functions for authentication

const router = express.Router(); // Create a new router instance

// Define a route to handle user signup
// This route will call the signup function from the auth controller
router.post("/signup", signup);

// Define a route to handle user login
// This route will call the login function from the auth controller
router.post("/login", login);

// Define a route to handle user logout
// This route will call the logout function from the auth controller
router.post("/logout", logout);

export default router; // Export the router instance

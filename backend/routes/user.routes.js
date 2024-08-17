import express from "express"; // Import Express framework
import protectRoute from "../middleware/protectRoute.js"; // Import the middleware to protect routes
import { getUsersForSidebar } from "../controllers/user.controller.js"; // Import the controller function

const router = express.Router(); // Create a new router instance

// Define a route to get users for the sidebar
// This route is protected by the protectRoute middleware
router.get("/", protectRoute, getUsersForSidebar);

export default router; // Export the router instance

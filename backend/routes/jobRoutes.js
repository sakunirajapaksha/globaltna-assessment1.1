import express from "express";

import {
  getJobRequests,
  getJobRequest,
  createJobRequest,
  updateJobStatus,
  deleteJobRequest,
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobRequests);
router.get("/:id", getJobRequest);

// ONLY LOGGED USERS
router.post("/", protect, createJobRequest);
router.patch("/:id", protect, updateJobStatus);
router.delete("/:id", protect, deleteJobRequest);

export default router;
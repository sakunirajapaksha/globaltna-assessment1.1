import JobRequest from '../models/JobRequest.js';

//GET all job requests
export const getJobRequests = async (req, res) => {
    try {
        const filters = {};

        if (req.query.category) {
            filters.category = req.query.category;
        }

        if (req.query.status) {
            filters.status = req.query.status;
        }

        const jobs = await JobRequest.find(filters).sort({ createdAt: -1 });
        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//GET SINGLE JOB

export const getJobRequest = async (req, res) => {
    try {
        const job = await JobRequest.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//CREATE A JOB
export const createJobRequest = async (req, res) => {
try {
const {
title,
description,
category,
location,
contactName,
contactEmail,
} = req.body;


if (
  !title ||
  !description ||
  !category ||
  !location ||
  !contactName ||
  !contactEmail
) {
  return res.status(400).json({
    message: "Please fill in all required fields",
  });
}

const newJob = await JobRequest.create({
  title,
  description,
  category,
  location,
  contactName,
  contactEmail,
});

res.status(201).json(newJob);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

//UPDATE A JOB STATUS

export const updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body || {};

        const job = await JobRequest.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        job.status = status;
        const updatedJob = await job.save();
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//DELETE JOB
export const deleteJobRequest = async (req, res) => {
    try {
        const job = await JobRequest.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await job.deleteOne();
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }       
};
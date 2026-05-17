import mongoose from "mongoose";
import validator from "validator";

const jobRequestSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
trim: true,
},


description: {
  type: String,
  required: true,
},

category: {
  type: String,
  required: true,
},

location: {
  type: String,
  required: true,
},

contactName: {
  type: String,
  required: true,
},

contactEmail: {
  type: String,
  required: true,
  validate: {
    validator: validator.isEmail,
    message: "Please provide a valid email",
  },
},

status: {
  type: String,
  enum: ["Open", "In Progress", "Closed"],
  default: "Open",
},


},
{
timestamps: true,
}
);

const JobRequest = mongoose.model(
"JobRequest",
jobRequestSchema
);

export default JobRequest;

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Assignment ID
    title: { type: String, required: true },
    course: { type: String, required: true }, // Could also be a ref to Course
    description: { type: String },
    points: { type: Number, default: 0 },
    dueDate: { type: Date },
    availableDate: { type: Date },
  },
  { collection: "assignments" }
);

export default assignmentSchema;

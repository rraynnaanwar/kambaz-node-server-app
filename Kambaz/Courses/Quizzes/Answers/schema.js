import mongoose from "mongoose";
const quizAttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizId: { type: String, required: true },
  attemptNumber: { type: Number, required: true },
  answers: { type: Map, of: mongoose.Schema.Types.Mixed }, // {questionId: answer}
  score: { type: Number, default: 0 },
  maxScore: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

quizAttemptSchema.index({ userId: 1, quizId: 1, attemptNumber: 1 }, { unique: true });
export default quizAttemptSchema;
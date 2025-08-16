import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    quizId: { type: String, required: true },
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_BLANK"],
      required: true
    },
    title: { type: String, required: true },
    points: { type: Number, default: 1, required: true },
    question: { type: String, required: true },
    
    // For multiple choice questions
    answers: [answerSchema],
    
    // For true/false and fill in blank questions
    correctAnswer: { type: mongoose.Schema.Types.Mixed }, // Can be boolean or string
    
    // For fill in blank - multiple possible correct answers
    possibleAnswers: [{ type: String }],
    
    // Question order within quiz
    order: { type: Number, default: 0 }
  },
  { 
    collection: "questions",
    timestamps: true 
  }
);

export default questionSchema;
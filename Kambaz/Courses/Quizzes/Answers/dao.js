import QuizAttempt from "./model.js";

// Get all attempts for a user on a specific quiz
export const getUserQuizAttempts = (userId, quizId) => 
  QuizAttempt.find({ userId, quizId }).sort({ attemptNumber: -1 });

// Create new quiz attempt
export const createQuizAttempt = (attemptData) => 
  QuizAttempt.create(attemptData);

// Update quiz attempt
export const updateQuizAttempt = (attemptId, updateData) => 
  QuizAttempt.findByIdAndUpdate(attemptId, updateData, { new: true });

// Get specific attempt by ID
export const getQuizAttemptById = (attemptId) => 
  QuizAttempt.findById(attemptId);

// Get latest attempt for user and quiz
export const getLatestAttempt = (userId, quizId) => 
  QuizAttempt.findOne({ userId, quizId, isCompleted: true })
    .sort({ attemptNumber: -1 });

// Count attempts for user and quiz
export const countUserAttempts = (userId, quizId) => 
  QuizAttempt.countDocuments({ userId, quizId, isCompleted: true });
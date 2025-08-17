import * as dao from "./dao.js";
import * as quizDao from "../dao.js"; // Import quiz dao for getting quiz data
import * as questionDao from "../Questions/dao.js";

export default function AnswersRoutes(app) {
  
  // Get all attempts for a user on a specific quiz
  const getUserQuizAttempts = async (req, res) => {
    try {
      const { userId, quizId } = req.params;
      const attempts = await dao.getUserQuizAttempts(userId, quizId);
      res.json(attempts);
    } catch (error) {
      console.error("Error getting user quiz attempts:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Create new quiz attempt
  const createQuizAttempt = async (req, res) => {
    try {
      const { quizId } = req.params;
      const attemptData = { ...req.body, quizId };
      
      // Get the quiz to validate it exists
      const quiz = await quizDao.getQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      
      // Get questions to calculate max score
      const questions = await questionDao.getQuestionsByQuiz(quizId);
      const maxScore = questions.reduce((sum, q) => sum + (q.points || 1), 0);
      
      // Count existing completed attempts
      const existingAttempts = await dao.countUserAttempts(attemptData.userId, quizId);
      
      // Check if user can take another attempt
      if (!quiz.multipleAttempts && existingAttempts > 0) {
        return res.status(403).json({ error: "Multiple attempts not allowed" });
      }
      
      if (quiz.multipleAttempts && existingAttempts >= quiz.maxAttempts) {
        return res.status(403).json({ error: "Maximum attempts reached" });
      }
      
      attemptData.maxScore = maxScore;
      attemptData.attemptNumber = existingAttempts + 1;
      
      const attempt = await dao.createQuizAttempt(attemptData);
      res.json(attempt);
    } catch (error) {
      console.error("Error creating quiz attempt:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Update quiz attempt (submit answers and score)
  const updateQuizAttempt = async (req, res) => {
    try {
      const { attemptId } = req.params;
      const updateData = req.body;
      
      const attempt = await dao.updateQuizAttempt(attemptId, updateData);
      
      if (!attempt) {
        return res.status(404).json({ error: "Quiz attempt not found" });
      }
      
      res.json(attempt);
    } catch (error) {
      console.error("Error updating quiz attempt:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Get specific attempt by ID
  const getQuizAttempt = async (req, res) => {
    try {
      const { attemptId } = req.params;
      const attempt = await dao.getQuizAttemptById(attemptId);
      
      if (!attempt) {
        return res.status(404).json({ error: "Quiz attempt not found" });
      }
      
      res.json(attempt);
    } catch (error) {
      console.error("Error getting quiz attempt:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Get latest attempt for user and quiz
  const getLatestAttempt = async (req, res) => {
    try {
      const { userId, quizId } = req.params;
      const attempt = await dao.getLatestAttempt(userId, quizId);
      
      if (!attempt) {
        return res.status(404).json({ error: "No attempts found" });
      }
      
      res.json(attempt);
    } catch (error) {
      console.error("Error getting latest attempt:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Register routes
  app.get("/api/quizzes/:quizId/attempts/user/:userId", getUserQuizAttempts);
  app.post("/api/quizzes/:quizId/attempts", createQuizAttempt);
  app.put("/api/quiz-attempts/:attemptId", updateQuizAttempt);
  app.get("/api/quiz-attempts/:attemptId", getQuizAttempt);
  app.get("/api/quizzes/:quizId/latest-attempt/:userId", getLatestAttempt);
}
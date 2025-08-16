import * as questionDao from "./dao.js";

export default function QuestionRoutes(app) {
  const getQuestionsByQuiz = async (req, res) => {
    const { quiz_id } = req.params;
    try {
      const questions = await questionDao.getQuestionsByQuiz(quiz_id);
      res.json(questions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const createQuestion = async (req, res) => {
    const { quiz_id } = req.params;
    const { question } = req.body;
    try {
      const newQuestion = await questionDao.createQuestion(quiz_id, question);
      res.json(newQuestion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateQuestion = async (req, res) => {
    const { quiz_id, question_id } = req.params;
    const { question } = req.body;
    try {
      const updatedQuestion = await questionDao.updateQuestion(question_id, question);
      res.json(updatedQuestion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteQuestion = async (req, res) => {
    const { quiz_id, question_id } = req.params;
    try {
      const deletedQuestion = await questionDao.deleteQuestion(question_id);
      if (!deletedQuestion) {
        return res.status(404).json({ success: false, message: "Question not found" });
      }
      res.json({ success: true, message: "Question deleted successfully", question_id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  const getQuestionById = async (req, res) => {
    const { question_id } = req.params;
    try {
      const question = await questionDao.getQuestionById(question_id);
      if (!question) {
        return res.status(404).json({ success: false, message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // QUESTION ROUTES
  app.get("/api/quizzes/:quiz_id/questions", getQuestionsByQuiz);
  app.get("/api/quizzes/:quiz_id/questions/:question_id", getQuestionById);
  app.post("/api/quizzes/:quiz_id/questions", createQuestion);
  app.put("/api/quizzes/:quiz_id/questions/:question_id", updateQuestion);
  app.delete("/api/quizzes/:quiz_id/questions/:question_id", deleteQuestion);
}
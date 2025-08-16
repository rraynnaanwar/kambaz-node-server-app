import * as dao from "./dao.js";
export default function QuizzesRoutes(app) {
  const setQuizPublished = async (req, res) => {
    const { quiz_id } = req.params;
    const { published } = req.body;

    try {
      const newQuiz = await dao.setQuizPublished(quiz_id, published);
      res.json(newQuiz);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const createQuiz = async (req, res) => {
  const { quiz } = req.body;
  try {
    if (quiz._id) {
      const existingQuiz = await dao.getQuizById(quiz._id);
      if (existingQuiz) {
        const updatedQuiz = await dao.updateQuiz(quiz._id, quiz);
        return res.json(updatedQuiz);
      }
    }
    
    // Quiz doesn't exist, create new one
    const newQuiz = await dao.createQuiz(quiz);
    res.json(newQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  const getQuizzesByCourse = async (req, res) => {
    const { course_id } = req.params;
    try {
      const quizzes = await dao.getQuizzesByCourse(course_id);
      res.json(quizzes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const getQuizById = async (req, res) => {
    const { quiz_id } = req.params;
    try {
      const quiz = await dao.getQuizById(quiz_id);
      res.json(quiz);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    const { quiz_id } = req.params;
    try {
      const deletedQuiz = await dao.deleteQuiz(quiz_id);

      if (!deletedQuiz) {
        return res.status(404).json({ success: false, message: "Quiz not found" });
      }

      res.json({success: true, message: "Quiz deleted successfully", quiz_id});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  app.get("/api/quizzes/courses/getQuizById/:quiz_id", getQuizById);
  app.get("/api/quizzes/courses/getQuizzesByCourse/:course_id", getQuizzesByCourse);

  app.put("/api/quizzes/:quiz_id", setQuizPublished);
  app.post("/api/quizzes/create", createQuiz);

  app.delete("/api/quizzes/courses/deleteQuiz/:quiz_id", deleteQuiz);
}

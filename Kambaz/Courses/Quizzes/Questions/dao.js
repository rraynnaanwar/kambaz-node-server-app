import questionModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const getQuestionsByQuiz = async (quizId) => {
  return await questionModel.find({ quizId }).sort({ order: 1 });
};

export const createQuestion = async (quizId, questionData) => {
  const newQuestion = { 
    ...questionData, 
    _id: uuidv4(),
    quizId,
    order: await getNextQuestionOrder(quizId)
  };
  return await questionModel.create(newQuestion);
};

export const updateQuestion = async (questionId, questionData) => {
  return await questionModel.findByIdAndUpdate(
    questionId,
    questionData,
    { new: true }
  );
};

export const deleteQuestion = async (questionId) => {
  return await questionModel.deleteOne({ _id: questionId });
};

export const getQuestionById = async (questionId) => {
  return await questionModel.findById(questionId);
};

// Helper function to delete all questions for a quiz (when quiz is deleted)
export const deleteQuestionsByQuiz = async (quizId) => {
  return await questionModel.deleteMany({ quizId });
};

// Helper function to get next order number
const getNextQuestionOrder = async (quizId) => {
  const lastQuestion = await questionModel
    .findOne({ quizId })
    .sort({ order: -1 });
  return lastQuestion ? lastQuestion.order + 1 : 1;
};
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function setQuizPublished(quiz_id, published) {
  return model.findByIdAndUpdate(quiz_id, {published: published}, {new: true})
};

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz);
}

export const getQuizzesByCourse = async (courseId) => {
  return await model.find({ courseId: courseId });
};

export const getQuizById = async (quizId) => {
  return await model.findById(quizId);
}

export const deleteQuiz = async(quizId) => {
  return await model.deleteOne({_id: quizId});
}

export const updateQuiz = async (quizId, quizData) => {
  const updatedQuiz = await model.findByIdAndUpdate(
    quizId,
    quizData,
    { new: true}
  );
  return updatedQuiz;
}
import mongoose from "mongoose"; 
import quizAttemptSchema from "./schema.js";

const quizAttemptModel = mongoose.model("QuizAttemptModle", quizAttemptSchema);
export default quizAttemptModel;
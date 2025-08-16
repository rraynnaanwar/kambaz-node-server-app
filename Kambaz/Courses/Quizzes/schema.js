import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    courseId: { type: String, required: true },
    
    // Add description field
    description: { type: String, default: "" },

    // Points and questions
    points: { type: Number, default: 0, required: true },
    numberOfQuestions: { type: Number, default: 0, required: true },

    // Quiz type
    quizType: {
      type: String,
      enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED_QUIZ"
    },

    // Assignment group
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES"
    },

    // Shuffle answers
    shuffleAnswers: { type: Boolean, default: true },

    // Time limit in minutes
    timeLimit: { type: Number, default: 20 },

    // Multiple attempts
    multipleAttempts: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1 },

    // Show correct answers settings
    showCorrectAnswers: { type: Boolean, default: false },
    correctAnswersDate: { type: Date }, // optional: when to show them

    // Access code
    accessCode: { type: String, default: "" },

    // One question at a time
    oneQuestionAtATime: { type: Boolean, default: true },

    // Webcam required
    webcamRequired: { type: Boolean, default: false },

    // Lock questions after answering
    lockQuestionsAfterAnswering: { type: Boolean, default: false },

    // Dates
    dueDate: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },

    // Publish state
    published: { type: Boolean, default: false }
  },
  { collection: "quizzes" }
);

export default quizSchema;
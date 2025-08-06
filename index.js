import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from './Kambaz/Users/routes.js';
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Courses/Assignments/routes.js";
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';
import "dotenv/config";

const app = express();

app.use(cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:5173",
    "https://exquisite-toffee-3adccf.netlify.app",  // Your Netlify URL
    "http://localhost:3000",  // Alternative local development
    "http://localhost:5173"   // Your current local development
  ],
  credentials: true
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
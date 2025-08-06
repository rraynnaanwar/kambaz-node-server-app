import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const enrollment = dao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      if (error.message === "User is already enrolled in this course") {
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const enrollment = dao.unenrollUserFromCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      if (error.message === "Enrollment not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  const findAllEnrollments = (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  };

  const checkEnrollment = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.findEnrollmentByUserAndCourse(userId, courseId);
    res.json({ isEnrolled: !!enrollment, enrollment });
  };
  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId/unenroll", unenrollUserFromCourse);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/users/:userId/courses/:courseId/enrollment", checkEnrollment);
}
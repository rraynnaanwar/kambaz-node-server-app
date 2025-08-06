import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = dao.createAssignment(assignment);
    res.send(newAssignment);
  };

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.retrieveAssignment(courseId);
    res.send(assignments);
  };

  const updateAssignmentForCourse = (req, res) => {
    const { courseId, assignmentId } = req.params;
    const updates = req.body;
    dao.updateAssignment(courseId, assignmentId, updates);
    res.sendStatus(200); 
  };

  const deleteAssignmentForCourse = (req, res) => {
    const { courseId, assignmentId } = req.params;
    dao.deleteAssignment(courseId, assignmentId);
    res.sendStatus(200); 
  };
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignmentForCourse);
  app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignmentForCourse);
}

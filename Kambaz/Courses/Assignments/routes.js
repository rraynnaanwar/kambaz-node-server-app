import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const createAssignmentForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await dao.createAssignment(assignment);
    res.send(newAssignment);
  };

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.send(assignments);
  };

  const updateAssignmentForCourse = async (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const status = await dao.updateAssignment(assignmentId, updates);
    res.send(status);
  };

  const deleteAssignmentForCourse = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.send(status);
  };

  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/courses/:courseId/assignments/:assignmentId", findAssignmentById);
  app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignmentForCourse);
  app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignmentForCourse);
}
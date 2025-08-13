import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return model.create(newAssignment);
}

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findAssignmentById(assignmentId) {
  return model.findById(assignmentId);
}

export function updateAssignment(assignmentId, updatedAssignment) {
  return model.findByIdAndUpdate(assignmentId, updatedAssignment, { new: true });
}

export function deleteAssignment(assignmentId) {
  return model.findByIdAndDelete(assignmentId);
}
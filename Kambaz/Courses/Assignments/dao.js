import Database from "../../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function retrieveAssignment(cid) {
  const { assignments } = Database;
  const courseAssignments = assignments.filter((a) => a.course === cid);
  return courseAssignments;
}

export function updateAssignment(cid, aid, updatedAssignment) {
  const { assignments } = Database;

  const index = assignments.findIndex((a) => a.course === cid && a._id === aid);

  if (index !== -1) {
    assignments[index] = {
      ...assignments[index],
      ...updatedAssignment,
      _id: aid,
      course: cid,
    };
  }
}
export function deleteAssignment(cid, aid) {
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (a) => !(a.course === cid && a._id === aid)
  );
}

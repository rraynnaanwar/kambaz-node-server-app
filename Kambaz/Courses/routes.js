import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  };

  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session['currentUser'];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  };

    const findUsersForCourse = async (req, res) => { 
    const { cid } = req.params; 
    const users = await enrollmentsDao.findUsersForCourse(cid); 
    res.json(users); 
  } 


  app.post("/api/courses", createCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse); 
  
  app.put("/api/courses/:courseId", updateCourse);

  app.delete("/api/courses/:courseId", deleteCourse);

  app.get("/api/courses", findAllCourses);
}

let todos = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description for Task 3",
    completed: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description for Task 4",
    completed: true,
  },
];

export default function WorkingWithArrays(app) {
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };

  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New Task Description",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };

  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };

  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  };

  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    todo.title = title;
    res.json(todos);
  };

  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    res.sendStatus(200);
  };

  const updateCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id == parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    todo.completed = completed === "true";
    res.json(todos);
  };

  const updateDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id == parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to find Todo with ID ${id}` });
      return;
    }
    todo.description = description;
    res.json(todos);
  };
  app.get("/lab5/todos/:id/description/:description", updateDescription);
  app.get("/lab5/todos/:id/completed/:completed", updateCompleted);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  
  app.put("/lab5/todos/:id", updateTodo);
  
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
  
  app.get("/lab5/todos/create", createNewTodo);
  app.post("/lab5/todos", postNewTodo);
  
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/:id", getTodoById);
}
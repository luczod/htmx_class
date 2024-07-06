import express, { Router } from "express";
import { Todo } from "../models/Todo.js";
import { Sequelize } from "sequelize";

const router = Router();

const createTemplate = (todo) => `
<li id=todo-${
  todo.id
} class="list-group-item d-flex justify-content-between align-align-items-center">
  <span>${todo.title}</span>
  <div>
   <form class="d-inline" hx-put="/api/todos/${todo.id}" hx-target="#todo-${
  todo.id
}" hx-swap="outerHTML">
   <input type="hidden" name="completed" value=${!todo.completed} />
   ${
     todo.completed
       ? `<i class="fa-solid fa-check text-sucesss p-3"></i>`
       : `<button class="btn btn-outline-secondary"><i class="fa-regular fa-clock"></i></button>`
   }
   </form>
  <form class="d-inline" hx-delete="/api/todos/${
    todo.id
  }" hx-target="#todo-list">
     <button class="btn btn-outline-danger">
     <i class="fa-solid fa-trash-can"></i>
     </button>
   </form>
  </div>
</li>
`;

router.get("/todos", async (_, res) => {
  const todos = await Todo.findAll();
  const todoItems = todos.map(createTemplate).join("");

  res.status(200).send(todoItems);
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });

  const todos = await Todo.findAll();
  const todoItems = todos.map(createTemplate).join("");

  res.status(200).send(todoItems);
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  await Todo.update({ completed: JSON.parse(completed) }, { where: { id } });

  const updatedTodo = await Todo.findByPk(id);
  res.send(createTemplate(updatedTodo));
});

router.post("/todos", async (req, res) => {
  const { title } = req.body;
  const newTodo = await Todo.create({ title });

  res.status(201).send(createTemplate(newTodo));
});

router.post("/search", async (req, res) => {
  const { search } = req.body;

  console.log(search);

  let where = {};

  if (search) {
    where.title = { [Sequelize.Op.like]: `%${search}%` };
  }

  const todos = await Todo.findAll({ where });
  const todoItems = todos.map(createTemplate).join("");
  res.send(todoItems);
});

export default router;

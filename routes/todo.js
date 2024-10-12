import express from "express"
import todoController from "../controllers/todo.controller.js"
import catchAsync from "../utils/catchAsync.js"
import { validateTodo } from "../middlewares/validator.js"

const router = express.Router()

router
  .route("/todos")
  .get(catchAsync(todoController.getTodos))
  .post(validateTodo, catchAsync(todoController.createTodo))

router.route("/todos/delete").post(catchAsync(todoController.deleteTodos))

router
  .route("/todos/:id")
  .put(catchAsync(todoController.updateTodo))
  .delete(catchAsync(todoController.deleteTodo))

router.route("/todos/reset").get(catchAsync(todoController.resetTodos))

export default router

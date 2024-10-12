import Todo from "../models/todo.model.js"
import ExpressError from "../utils/ExpressError.js"

const todo = {
  getTodos: async (req, res) => {
    const todos = await Todo.find({})
    res.json({
      status: "success",
      message: "Bisa bro",
      todos,
    })
  },
  createTodo: async (req, res) => {
    const todo = await Todo.create(req.body)
    await todo.save()
    res.json(todo)
  },

  updateTodo: async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (!todo) {
      throw new ExpressError("Todo not found", 404)
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.json(updatedTodo)
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (!todo) {
      throw new ExpressError("Todo not found", 404)
    }
    const deletedTodo = await Todo.findByIdAndDelete(id)
    res.json(deletedTodo)
  },

  deleteTodos: async (req, res) => {
    const { ids } = req.body
    if (!ids || ids.length === 0) {
      throw new ExpressError("No ids provided", 400)
    }
    const deletedTodos = await Todo.deleteMany({ _id: { $in: ids } })
    // res.json(deletedTodos)
    res.send(`Deleted todos with ids: ${ids.join(", ")}`)
  },

  // Experimental
  resetTodos: async (req, res) => {
    const todos = await Todo.deleteMany({})
    res.json(todos)
  },
}

export default todo

import { TodoSchema } from "../config/schemaValidator.js"
import ExpressError from "../utils/ExpressError.js"

export const validateTodo = (req, res, next) => {
  const { error } = TodoSchema.validate(req.body)
  if (error) {
    const msg = error.details.map((el) => el.message).join(",")
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

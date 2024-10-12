import mongoose from "mongoose"
import { Schema } from "mongoose"

const Todo = new Schema({
  title: {
    type: String,
    required: ["true", "Title is required."],
  },
  description: {
    type: String,
    required: ["true", "Please provide a description."],
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model("Todo", Todo)

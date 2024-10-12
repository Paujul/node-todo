import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") dotenv.config()
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import ExpressError from "./utils/ExpressError.js"

// Import Routes
import todoRoutes from "./routes/todo.js"

const app = express()
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:("))
db.once("open", () => {
  console.log("MongoDB connected")
})

// Enable JSON
app.use(express.json())

// Routes
app.use("/api", todoRoutes)

app.get("/", (req, res) => {
  res.send("You have successfully connected to the Todo API.")
})

// Default Settings

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  return next()
})

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found!", 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) err.message = "Something went wrong :/"
  res.status(statusCode).send(err.message)
})

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000!")
})

require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000
const mongodbUri = process.env.MONGODB_URI || "mongodb-uri"

mongoose.connect(mongodbUri, {
    bufferCommands: false,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.log("MongoDB connection error:", error);
})

// Настройка EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Настройка body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Настройка method-override
app.use(methodOverride("_method"))

// Настройка статичных файлов
app.use(express.static(path.join(__dirname, "public")))

// Настройка маршрутов
const todoRoutes = require("./routes/todo")
app.use("/todos", todoRoutes)

app.get("/", (req, res) => {
    res.redirect("/todos")
})

app.get("/ejs", (req, res) => {
    res.render("index", { title: "Hello, EJS!", user: { name: "John Doe" } })
})

module.exports = app;
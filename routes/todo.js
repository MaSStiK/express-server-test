const express = require("express")
const { body } = require("express-validator")
const router = express.Router()
const todoController = require("../controllers/todoController.js")

// Получение списка задач
router.get("/", todoController.getTodos)

// Создание задачи
router.post("/",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").isLength({ max: 200 }).withMessage("Description cannot be longer than 200 characters")
    ],
    todoController.createTodo
)

// Обновление задачи
router.put("/update/:id",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").isLength({ max: 200 }).withMessage("Description cannot be longer than 200 characters")
    ],
    todoController.updateTodo
)

// Удаление задачи
router.delete("/delete/:id", todoController.deleteTodo)

module.exports = router
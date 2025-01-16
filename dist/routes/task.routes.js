"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const router = (0, express_1.Router)();
router.get("/", task_controller_1.default.getAllTasks);
router.get("/:id", task_controller_1.default.getTask);
router.post("/", task_controller_1.default.addNewTask);
router.patch("/:id", task_controller_1.default.updateTask);
router.delete("/:id", task_controller_1.default.deleteTask);
// Optional just for bulk delete. It doesn't follow the REST pattern
router.post("/bulkDelete", task_controller_1.default.bulkDelete);
exports.default = router;

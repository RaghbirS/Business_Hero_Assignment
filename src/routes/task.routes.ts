import { Router } from "express";
import TaskController from "../controllers/task.controller";

const router = Router();

router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTask);
router.post("/", TaskController.addNewTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

// Optional just for bulk delete. It doesn't follow the REST pattern
router.post("/bulkDelete", TaskController.bulkDelete);

export default router;
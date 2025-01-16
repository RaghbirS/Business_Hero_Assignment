import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();
router.use("/auth", authRoutes);
router.use(authenticateToken);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes );

export default router;

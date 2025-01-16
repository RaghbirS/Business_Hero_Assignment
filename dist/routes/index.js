"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: Bearer  # Indicating it's a generic Bearer token (no JWT specifics)
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *
 * security:
 *   - BearerAuth: []  # This applies the BearerAuth globally to all routes
 */
const router = (0, express_1.Router)();
// Routes that don't require authentication
router.use("/auth", auth_routes_1.default); // Register and login routes
// Middleware that checks for a valid token (authentication)
router.use(authMiddleware_1.authenticateToken);
// Routes that require authentication
router.use("/users", user_routes_1.default);
router.use("/tasks", task_routes_1.default);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../utils/asyncHandler");
const dotenv_1 = __importDefault(require("dotenv"));
const task_model_1 = __importDefault(require("../models/task.model"));
const errorCodes_1 = require("../utils/errorCodes");
dotenv_1.default.config();
class TaskController {
}
_a = TaskController;
// Method to get all Tasks of a user
TaskController.getAllTasks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.default.find(Object.assign(Object.assign({}, req.query), { createdBy: req.user._id })).lean();
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: "Tasks Fetched Successfully", data: tasks });
}));
// Method to get a Task
TaskController.getTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Task id is required' });
        return;
    }
    const tasks = yield task_model_1.default.findOne(Object.assign(Object.assign({}, req.query), { _id: req.params.id, createdBy: req.user._id })).lean();
    if (!tasks) {
        res.status(errorCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: 'Task not found' });
        return;
    }
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: 'Task Fetched Successfully', data: tasks });
}));
// Method to Add new Task
TaskController.addNewTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Title, description and status fields are required' });
        return;
    }
    if (!["pending", "inProgress", "completed"].includes(status)) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Invalid status' });
        return;
    }
    const newData = { title, description, status, createdBy: user._id };
    const newTask = yield task_model_1.default.create(newData);
    res.status(errorCodes_1.HttpStatusCodes.CREATED).json({ message: 'Task Created Successfully', data: newTask });
}));
//Method to update Task
TaskController.updateTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Task id is required' });
        return;
    }
    const { title, description, status } = req.body;
    const task = yield task_model_1.default.findOne({ _id: id, createdBy: req.user._id });
    if (!task) {
        res.status(errorCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: 'Task not found' });
        return;
    }
    if (!["pending", "inProgress", "completed"].includes(status)) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Invalid status' });
        return;
    }
    task.title = title !== null && title !== void 0 ? title : task.title;
    task.description = description !== null && description !== void 0 ? description : task.description;
    task.status = status !== null && status !== void 0 ? status : task.status;
    yield task.save();
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: 'Task Updated Successfully', data: task });
}));
// Method to delete a task
TaskController.deleteTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Task id is required' });
        return;
    }
    const deletedTask = yield task_model_1.default.findOneAndDelete({ _id: id, createdBy: req.user._id }).lean();
    if (!deletedTask) {
        res.status(errorCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: 'Task not found' });
        return;
    }
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: 'Task Deleted Successfully', data: deletedTask });
}));
// Method to delete multiple Tasks
TaskController.bulkDelete = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body; // Expecting an array of _ids in the body
    if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error('Ids must be a non-empty array');
    }
    try {
        const result = yield task_model_1.default.deleteMany({ _id: { $in: ids }, createdBy: req.user._id });
        if (result.deletedCount === 0) {
            throw new Error('No tasks deleted');
        }
        res.status(errorCodes_1.HttpStatusCodes.OK).send({ message: 'Tasks deleted successfully', result });
    }
    catch (error) {
        res.status(errorCodes_1.HttpStatusCodes.OK).send({ error: 'Something Went Wrong !' });
    }
}));
exports.default = TaskController;

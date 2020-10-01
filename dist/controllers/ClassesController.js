"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IndexClassesService_1 = __importDefault(require("../services/IndexClassesService"));
const IndexUserClassesService_1 = __importDefault(require("../services/IndexUserClassesService"));
const CreateClassesService_1 = __importDefault(require("../services/CreateClassesService"));
class ClassesController {
    async indexAll(request, response) {
        try {
            const indexClassesService = new IndexClassesService_1.default();
            const teachers = await indexClassesService.execute();
            return response.status(200).json(teachers);
        }
        catch (error) {
            return response.status(400).json({
                error: "No classes where found",
            });
        }
    }
    async index(request, response) {
        const { id } = request.params;
        try {
            const indexUserClassesService = new IndexUserClassesService_1.default();
            const classes = await indexUserClassesService.execute({ id });
            return response.status(200).json(classes);
        }
        catch (error) {
            return response.status(400).json({
                error: "No classes where found",
            });
        }
    }
    async create(request, response) {
        const { subject, cost, schedule } = request.body;
        const { id } = request.params;
        try {
            if (!id || !subject || !cost || !schedule) {
                return;
            }
            const createdClassService = new CreateClassesService_1.default();
            const newClass = await createdClassService.execute({
                id,
                subject,
                cost,
                schedule,
            });
            return response.status(201).json(newClass);
        }
        catch (error) {
            return response.status(400).json({
                error: error.message,
            });
        }
    }
}
exports.default = ClassesController;

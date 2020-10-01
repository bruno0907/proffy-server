"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IndexClassService_1 = __importDefault(require("../services/IndexClassService"));
const UpdateClassService_1 = __importDefault(require("../services/UpdateClassService"));
const DeleteClassService_1 = __importDefault(require("../services/DeleteClassService"));
class ClassController {
    async index(request, response) {
        const { id } = request.params;
        try {
            const indexClassService = new IndexClassService_1.default();
            const userClass = await indexClassService.execute({ id });
            response.status(200).json(userClass);
        }
        catch (error) {
            response.status(400).json({
                message: 'An error has ocurried',
                error: error.message
            });
        }
    }
    async update(request, response) {
        const { id } = request.params;
        const { cost, schedule } = request.body;
        try {
            const updateClassService = new UpdateClassService_1.default();
            const data = await updateClassService.execute({
                id,
                cost,
                schedule
            });
            response.status(200).json(data);
        }
        catch (error) {
            response.status(400).json({
                message: 'An error has ocurried',
                error: error.message
            });
        }
    }
    async delete(request, response) {
        const { id } = request.params;
        try {
            const deleteClassService = new DeleteClassService_1.default();
            const data = await deleteClassService.execute({ id });
            return response.status(200).json({ data });
        }
        catch (error) {
            response.status(400).json({
                message: 'A request error has ocurried',
                error: error.message
            });
        }
    }
}
exports.default = ClassController;

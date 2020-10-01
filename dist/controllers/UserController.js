"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IndexUserService_1 = __importDefault(require("../services/IndexUserService"));
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const UpdateUserService_1 = __importDefault(require("../services/UpdateUserService"));
class UserController {
    async index(request, response) {
        try {
            const indexUserService = new IndexUserService_1.default();
            const totalUsers = await indexUserService.execute();
            const { total } = totalUsers[0];
            return response.status(200).json(total);
        }
        catch (error) {
            return response.status(400).json({
                error: error.message
            });
        }
    }
    async create(request, response) {
        const { name, surname, email, password, password_confirm } = request.body;
        try {
            const createUserService = new CreateUserService_1.default();
            const user = await createUserService.execute({
                name,
                surname,
                email,
                password,
                password_confirm
            });
            return response.status(201).json(user);
        }
        catch (error) {
            return response.status(400).json({
                message: 'An error has ocurried while creating a new user register',
                error: error.message
            });
        }
    }
    async update(request, response) {
        const { avatar, name, surname, email, whatsapp, bio, } = request.body;
        const { id } = request.params;
        try {
            const updateUserService = new UpdateUserService_1.default();
            await updateUserService.execute({
                id,
                avatar,
                name,
                surname,
                email,
                whatsapp,
                bio,
            });
            return response.status(200).json({
                id,
                avatar,
                name,
                surname,
                email,
                whatsapp,
                bio,
            });
        }
        catch (error) {
            return response.status(400).json({
                message: 'Error updating user.',
                error: error.message
            });
        }
    }
}
exports.default = UserController;

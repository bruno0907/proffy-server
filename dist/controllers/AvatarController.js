"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateAvatarService_1 = __importDefault(require("../services/UpdateAvatarService"));
class AvatarController {
    async update(request, response) {
        const { filename: avatar } = request.file;
        const { id } = request.params;
        try {
            const updateAvatarService = new UpdateAvatarService_1.default();
            const [user] = await updateAvatarService.execute({
                id,
                avatar
            });
            return response.status(201).json({ user });
        }
        catch (error) {
            return response.status(400).json({
                message: 'An error has ocurried updating avatar',
                error: error.message
            });
        }
    }
}
exports.default = AvatarController;

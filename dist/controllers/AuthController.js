"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthUserService_1 = __importDefault(require("../services/AuthUserService"));
class AuthController {
    async login(request, response) {
        try {
            const { email, password } = request.body;
            const authUserService = new AuthUserService_1.default();
            const { userData, token } = await authUserService.execute({ email, password });
            const user = {
                id: userData.id,
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                password: userData.password,
                avatar: userData.avatar,
                whatsapp: userData.whatsapp,
                bio: userData.bio,
            };
            response.status(200).json({ user, token });
        }
        catch (error) {
            return response.status(400).json({
                message: 'Something wrong is not right!',
                error: error.message
            });
        }
    }
}
exports.default = AuthController;

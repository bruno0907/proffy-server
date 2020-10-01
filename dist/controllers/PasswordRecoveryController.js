"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordRecoveryService_1 = __importDefault(require("../services/PasswordRecoveryService"));
const PasswordResetService_1 = __importDefault(require("../services/PasswordResetService"));
class PasswordRecoveryController {
    async index(request, response) {
        const { email: userEmail } = request.body;
        try {
            const passwordRecoveryService = new PasswordRecoveryService_1.default();
            await passwordRecoveryService.execute(userEmail);
            return response.status(200).json({
                message: 'Redefinition e-mail sent!',
            });
        }
        catch (error) {
            return response.status(400).json({
                message: 'Error sending redefinition e-email',
                error: error.message
            });
        }
    }
    async update(request, response) {
        const { email, password, password_confirm } = request.body;
        if (password !== password_confirm)
            response.status(400).json({
                message: 'Passwords dont Match!'
            });
        try {
            const passwordResetService = new PasswordResetService_1.default();
            await passwordResetService.execute({ email, password, password_confirm });
            return response.status(200).json({
                message: 'Password redefinition success!',
            });
        }
        catch (error) {
            return response.status(400).json({
                message: 'Error redefining the password',
                error: error.message
            });
        }
    }
}
exports.default = PasswordRecoveryController;

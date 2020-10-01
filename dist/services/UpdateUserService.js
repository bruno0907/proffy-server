"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class UpdateUserService {
    async execute({ id, avatar, name, surname, email, whatsapp, bio, }) {
        const updatedUsers = await connection_1.default('users')
            .where({ id })
            .update({
            avatar,
            name,
            surname,
            email,
            whatsapp,
            bio,
        });
        if (updatedUsers) {
            return updatedUsers;
        }
        else {
            throw new Error('An error has ocurried while updating the user');
        }
    }
}
exports.default = UpdateUserService;

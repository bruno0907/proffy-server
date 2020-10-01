"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class UpdateAvatarService {
    async execute({ id, avatar }) {
        try {
            if (!id || !avatar) {
                throw new Error('Missing id or avatar on request');
            }
            const user = await connection_1.default('users')
                .where({ id })
                .first();
            if (!user) {
                throw new Error('User not found');
            }
            const updatedUser = await connection_1.default('users')
                .where({ id })
                .update({ avatar }, ['*']);
            return updatedUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = UpdateAvatarService;

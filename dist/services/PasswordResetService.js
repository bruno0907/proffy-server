"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    async execute({ email, password, password_confirm }) {
        if (!email || !password || !password_confirm) {
            throw new Error('All fields are required');
        }
        if (password !== password_confirm) {
            throw new Error('Passwords dont match!');
        }
        const emailExists = await connection_1.default('users')
            .where({ email })
            .first();
        if (!emailExists) {
            throw new Error('Provided email does not exists');
        }
        const hashedPassword = await bcryptjs_1.hash(password, 8);
        const updatePassword = await connection_1.default('users')
            .where({ email })
            .update({
            password: hashedPassword
        });
        if (updatePassword) {
            return {
                status: 'ok',
                statusCode: '201'
            };
        }
        else {
            return {
                status: 'error',
                statusCude: '400'
            };
        }
    }
}
exports.default = CreateUserService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    async execute({ name, surname, email, password, password_confirm }) {
        try {
            if (!name || !email || !password || !password_confirm) {
                throw new Error('All fields are required');
            }
            if (password !== password_confirm) {
                throw new Error('Passwords dont match!');
            }
            const emailExists = await connection_1.default('users')
                .where('users.email', '=', email)
                .first();
            if (emailExists) {
                throw new Error('The email you provided is already in use');
            }
            const hashedPassword = await bcryptjs_1.hash(password, 8);
            const createUser = await connection_1.default('users').insert({
                name,
                surname,
                email,
                password: hashedPassword
            });
            return createUser;
        }
        catch (error) {
            throw new Error('Cannot register new user');
        }
    }
}
exports.default = CreateUserService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute({ email, password }) {
        if (!email && !password) {
            throw new Error('Email and/or password fields are empty');
        }
        const userData = await connection_1.default('users')
            .where('users.email', '=', email)
            .first();
        if (!userData) {
            throw new Error('User not found');
        }
        const doesPasswordsMatch = await bcryptjs_1.compare(password, userData.password);
        if (!doesPasswordsMatch) {
            throw new Error('Passwords dont match');
        }
        const token = jsonwebtoken_1.sign({}, process.env.SECRET_KEY, {
            subject: userData.email,
            expiresIn: '1d',
        });
        return { userData, token: token };
    }
}
exports.default = AuthUserService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class IndexUserService {
    async execute() {
        const users = await connection_1.default('users')
            .count('* as total');
        return users;
    }
}
exports.default = IndexUserService;

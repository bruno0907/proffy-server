"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class DeleteClassService {
    async execute({ id }) {
        try {
            await connection_1.default('class_schedule')
                .where({ id })
                .delete();
        }
        catch (error) {
            throw new Error('Cannot delete class');
        }
    }
}
exports.default = DeleteClassService;

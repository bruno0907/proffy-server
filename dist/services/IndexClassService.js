"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class RetrieveClassService {
    async execute({ id }) {
        const response = connection_1.default('class_schedule')
            .where('class_schedule.class_id', '=', id)
            .join('classes', 'classes.id', 'class_schedule.class_id')
            .select('classes.*')
            .select(connection_1.default.raw('JSON_AGG(class_schedule.* ORDER BY class_schedule.week_day) as classes'))
            .groupBy('classes.id');
        return response;
    }
}
exports.default = RetrieveClassService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ListClassesService {
    async execute() {
        const teachers = connection_1.default('classes')
            .join('users', 'classes.user_id', 'users.id')
            .join('class_schedule', 'classes.id', 'class_schedule.class_id')
            .select('classes.id', 'classes.subject', 'classes.cost', 'classes.user_id')
            .select('users.id as user_id', 'users.name', 'users.surname', 'users.bio', 'users.avatar', 'users.whatsapp')
            .select(connection_1.default.raw('JSON_AGG(class_schedule.* ORDER BY class_schedule.week_day) as classes'))
            .groupBy('classes.id', 'users.id');
        return teachers;
    }
}
exports.default = ListClassesService;

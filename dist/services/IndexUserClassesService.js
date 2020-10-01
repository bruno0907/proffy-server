"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ListClassesService {
    async execute({ id }) {
        const classes = connection_1.default('classes')
            .where('user_id', '=', id)
            .join('class_schedule', 'classes.id', 'class_schedule.class_id')
            .select('classes.*')
            .select(connection_1.default.raw('JSON_AGG(class_schedule.*) as classes'))
            .groupBy('classes.id', 'class_schedule.class_id');
        return classes;
    }
}
exports.default = ListClassesService;

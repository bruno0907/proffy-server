"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const convertHourToMinutes_1 = __importDefault(require("../utils/convertHourToMinutes"));
class CreateClassesService {
    async execute({ id, subject, cost, schedule }) {
        const trx = await connection_1.default.transaction();
        try {
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id: id
            }).returning('id');
            const class_id = insertedClassesId[0];
            const classSchedule = schedule.map((scheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes_1.default(scheduleItem.from),
                    to: convertHourToMinutes_1.default(scheduleItem.to)
                };
            });
            await trx('class_schedule').insert(classSchedule);
            await trx.commit();
            return;
        }
        catch (error) {
            trx.rollback();
            throw new Error('Error adding new classes');
        }
    }
}
exports.default = CreateClassesService;

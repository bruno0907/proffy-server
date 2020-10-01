"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar');
        table.string('whatsapp');
        table.string('bio');
    });
}
exports.up = up;
async function down(knext) {
    return knext.schema.dropTable('users');
}
exports.down = down;

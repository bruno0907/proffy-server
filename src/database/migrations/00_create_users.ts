import Knex, { KnexTimeoutError } from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('surname').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('avatar')
        table.string('whatsapp')
        table.string('bio')
    })
}

export async function down(knext: Knex){
    return knext.schema.dropTable('users')
}
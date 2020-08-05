import Knex, { KnexTimeoutError } from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary()

        table.integer('user_id')
            .notNullable()
            .references('id') 
            .inTable('users') 
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        table.timestamp('create_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable()
    })
}

export async function down(knext: Knex){
    return knext.schema.dropTable('connections')
}
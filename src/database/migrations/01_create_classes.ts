import Knex, { KnexTimeoutError } from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary()
        table.string('subject').notNullable()
        table.decimal('cost').notNullable()     

        // tabela de relacionamto da 'aula' com o usuário que a está criando.
        table.integer('user_id')
            .notNullable()
            .references('id') // propriedade de referência.
            .inTable('users') //tabela de relacionamento com o usuário que está criando a aula. Foreign Key.
            .onUpdate('CASCADE') // a opção CASCADE executa a função "onUpdate" para todas as aulas onde o user_id for atualizado.            
            .onDelete('CASCADE') // a opção CASCADE executa a função "onDelete" para todas as aulas onde o user_id for deletado. Deletará todas as aulas relacionadas ao ID .
    })
}

export async function down(knext: Knex){
    return knext.schema.dropTable('classes')
}
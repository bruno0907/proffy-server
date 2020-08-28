import knex from 'knex'
import 'dotenv/config'

const db = knex({
    client: 'pg',
    connection: {        
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        // host: 'localhost',
        // user: 'postgres',
        // password: 'docker',
        // database: 'proffy',
    },
    useNullAsDefault: true,
})

export default db;
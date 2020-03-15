import * as Knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
	client: 'mysql',
	connection: {
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	},
}

const instance: Knex = Knex(config as Knex.Config)

export const db = () => instance
import {connect} from '@planetscale/database'
import {config} from '../db/config'
import {drizzle} from 'drizzle-orm/planetscale-serverless'
import {drizzle as myDrizzle} from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import {quotes, authors, categories} from '../db/schema'
import {eq} from 'drizzle-orm'

export const getAllQuotes = async (): Promise<Quote[]> => {
	const conn = connect(config)
	
	const poolConnection = mysql.createPool({
		host: config.host,
  	user: config.username,
		password: config.password,
  	// database: 'quotesDb',
		database: 't3-dev'
	}) //mysql
	
	//const db = myDrizzle(poolConnection) //mysql
	const db = drizzle(conn)

	const results: Quote[] = await db.select({
		quote: quotes.quote,
		author: authors.author,
		category: categories.category
	})
	.from(quotes)
	.innerJoin(authors, eq(quotes.authorId, authors.id))
	.innerJoin(categories, eq(quotes.categoryId, categories.id))

	console.log(results);

	return results
}
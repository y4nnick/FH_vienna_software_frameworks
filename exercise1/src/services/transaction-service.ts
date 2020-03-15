import { db } from '../database/db-config'
import { Transaction } from '../models/transaction'
import * as moment from 'moment'

const TABLE_NAME = 'transactions'

/**
 * Creates the transaction with the given data
 */
export async function createTransaction({ transaction }: { transaction: Omit<Transaction, 'id'>}): Promise<Transaction> {
	const [id] = await db().insert(transaction).into(TABLE_NAME)

	const createdTransaction = await getTransaction({ id })

	if (!createdTransaction) {
		throw new Error('Created transaction could not be found')
	}

	return createdTransaction
}

/**
 * Delivers the transaction for the given id
 */
async function getTransaction({ id }: { id: number }): Promise<Transaction | undefined> {
	return db()
		.select('id', 'execution_date', 'amount', 'description', 'creditor', 'debtor')
		.from(TABLE_NAME)
		.where('id', id)
		.first().then(mapTransaction)
}

function mapTransaction(transaction: any | undefined): Transaction | undefined {
	if (!transaction) {
		return
	}

	// Knex doesn't return a date here so we have to create one -.-
	return { ...transaction, execution_date: new Date(transaction.execution_date) }
}

export async function getTransactionsForIbanAndMonth({ iban, month }: { iban: string, month: Date }): Promise<Array<Transaction>> {
	const momentDate = moment(month)
	const startOfMonth = momentDate.startOf('month').toDate()
	const endOfMonth = momentDate.endOf('month').toDate()

	const transactions: Array<Transaction> = await db()
		.select('id', 'execution_date', 'amount', 'description', 'creditor', 'debtor')
		.from(TABLE_NAME)
		.where(knex => {
			knex.where('creditor', iban).orWhere('debtor', iban)
		})
		.where('execution_date', '>=', startOfMonth)
		.where('execution_date', '<=', endOfMonth)

	// @ts-ignore we are sure that all the found transactions are defined here
	return transactions.map(mapTransaction)
}


/**
 * Determines if the given customer is valid
 */
export function isValidTransaction(transaction: any) {
	// TODO in a production version this should also validate the input but i consider this out of scope for this exercise.
	return transaction
		&& transaction.execution_date
		&& transaction.amount
		&& transaction.description
		&& transaction.creditor
		&& transaction.debtor
}
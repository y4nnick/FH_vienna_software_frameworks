import { APIGatewayEvent } from 'aws-lambda'
import { buildErrorResponse, buildLambdaResponse } from './lambda-helper'
import * as transactionService from '../services/transaction-service'
import * as customerService from '../services/customer-service'
import { Transaction } from '../models/transaction'

export async function create(event: APIGatewayEvent) {
	try {
		// Read out the transaction from the body
		const transaction: Omit<Transaction, 'id'> = JSON.parse(event.body!) as Omit<Transaction, 'id'>

		// Validate the transaction
		if (!transactionService.isValidTransaction(transaction)) {
			throw new Error('Please provide a valid transaction')
		}

		// Check if the debtor and creditor really exist
		const debtor = await customerService.getCustomerByIban({ iban: transaction.debtor })
		if (!debtor) throw new Error('The given debtor could not be found')

		const creditor = await customerService.getCustomerByIban({ iban: transaction.creditor })
		if (!creditor) throw new Error('The given creditor could not be found')

		// Create transaction
		const createdTransaction = await transactionService.createTransaction({ transaction })

		return buildLambdaResponse({ transaction: createdTransaction })
	} catch (e) {
		// Error handling in a production version would have to be more complex (eg. different error codes etc.)
		return buildErrorResponse(e.sqlMessage ? e.sqlMessage : e.toString())
	}
}
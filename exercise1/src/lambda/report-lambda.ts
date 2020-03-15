import { APIGatewayEvent } from 'aws-lambda'
import { buildErrorResponse, buildLambdaResponse } from './lambda-helper'
import * as transactionService from '../services/transaction-service'
import * as customerService from '../services/customer-service'
import { Report } from '../models/report'

export async function report(event: APIGatewayEvent) {
	try {
		// Read out the iban and month from the body
		// @ts-ignore we will check if this params are correct
		const params: { iban: string, month: Date } = event.queryStringParameters
		if (!params || !params.iban || !params.month) throw new Error(`Please provide a valid iban and month`)

		const month = new Date(params.month)
		const iban = params.iban

		// Get customer
		const customer = await customerService.getCustomerByIban({ iban })
		if (!customer) throw new Error('The given iban could not be found')

		// Get transactions
		const transactions = await transactionService.getTransactionsForIbanAndMonth({ iban, month })

		// Return report
		const reportData: Report = { customer, transactions }
		return buildLambdaResponse({ report: reportData })
	} catch (e) {
		return buildErrorResponse(e.sqlMessage ? e.sqlMessage : e.toString())
	}
}
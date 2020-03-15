import { APIGatewayEvent } from 'aws-lambda'
import { buildLambdaResponse, buildErrorResponse } from './lambda-helper'
import * as customerService from '../services/customer-service'
import { Customer } from '../models/customer'

export async function create(event: APIGatewayEvent) {
	try {
		// Read out the customer from the body
		const customer: Omit<Customer, 'id'> = JSON.parse(event.body!)
		if (!customerService.isValidCustomer(customer)) {
			throw new Error('Please provide a valid customer')
		}

		// Create customer and return it
		const createdCustomer = await customerService.createCustomer({ customer })
		return buildLambdaResponse({ customer: createdCustomer })
	} catch (e) {
		return buildErrorResponse(e.sqlMessage ? e.sqlMessage : e.toString())
	}
}

export async function getAll(event: APIGatewayEvent) {
	try {
		const customers = await customerService.getAllCustomer()
		return buildLambdaResponse({ customers: customers })
	} catch (e) {
		return buildErrorResponse(e.sqlMessage ? e.sqlMessage : e.toString())
	}

}

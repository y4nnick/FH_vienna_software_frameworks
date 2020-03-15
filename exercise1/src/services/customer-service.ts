import { Customer } from '../models/customer'
import { db } from '../database/db-config'

const TABLE_NAME = 'customer'

/**
 * Creates the customer with the given data
 */
export async function createCustomer({ customer }: { customer: Omit<Customer, 'id'>}): Promise<Customer> {
	const [id] = await db().insert(customer).into(TABLE_NAME)

	const createdCustomer = await getCustomer({ id })

	if (!createdCustomer) {
		throw new Error('Created customer could not be found')
	}

	return createdCustomer
}

/**
 * Delivers all customers ordered by id
 */
export async function getAllCustomer(): Promise<Array<Customer>> {
	return db()
		.select('id', 'name', 'address', 'iban')
		.from(TABLE_NAME)
		.orderBy('id')
}

/**
 * Delivers a customer by the given iban or undefined if the customer can not be found
 */
export async function getCustomerByIban({ iban }: { iban: string }): Promise<Customer | undefined> {
	return db()
		.select('id', 'name', 'address', 'iban')
		.from(TABLE_NAME)
		.where('iban', iban)
		.first()
}

/**
 * Delivers the customer for the given id
 */
export async function getCustomer({ id }: { id: number }): Promise<Customer | undefined> {
	return db()
		.select('id', 'name', 'address', 'iban')
		.from(TABLE_NAME)
		.where('id', id)
		.first()
}

/**
 * Determines if the given customer is valid
 */
export function isValidCustomer(customer: any) {
	// TODO in a production version this should also validate the input but i consider this out of scope for this exercise
	return customer && customer.name && customer.address && customer.iban && customer.iban.length <= 25;
}
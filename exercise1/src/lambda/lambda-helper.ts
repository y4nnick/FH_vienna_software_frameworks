export function buildLambdaResponse(data: any): any {
	return {
		statusCode: 200,
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	};
}

export function buildErrorResponse(msg: string): any {
	console.error(msg)
	return {
		statusCode: 500,
		body: JSON.stringify({ error: msg }),
		headers: {
			"Content-Type": "application/json"
		}
	}
}
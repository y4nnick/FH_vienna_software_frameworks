# Exercise 1
This is the solution for the first exercise in software frameworks at the FH technikum vienna (SS2020)
The assignment description can be found in the root folder.

I am using serverless to deploy 3 different lambdas to AWS.

1. Customers: Stores and persists customers with IBAN
2. Transactions: Stores transactions between IBANs
3. Monthly report: Report for a single IBAN

### Stack
 - Serverless for deploying lambdas
 - Typscript
 - RDS mySQL database on AWS
 - yarn (npm) for package managing

### Prerequests
 - Install `yarn`
 - Install `serverless`
 - Create a `.env` file in the root folder based on the example `.env-sample`. Replace the connection parameters for the database.

### Commands:
 - `yarn offline`: Start a local serverless infrastructure to test the lambdas locally.
 - `yarn deploy`: Deploy the lambdas to aws

### Usefull links:
 - Serverless deployment: https://serverless.com/framework/docs/providers/aws/guide/deploying/
 -

# Production related
Of course this application is not ready for production usecase.
Missing:
 - Proper input validation
 - Error handling
 - Authentication/Authorization
 - Correct logging of errors
 - Much more,...
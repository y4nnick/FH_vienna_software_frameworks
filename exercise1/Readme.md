## Software frameworks - Exercise 1
I am using serverless to delpoy 3 different lambdas to AWS.

1. Customers: Stores and persists customers with IBAN
2. Transactions: Stores transactions between IBANs
3. Monthly report: Report for a single IBAN

### Prerequests
 - Install `npm` or `yarn`
 - Install `serverless`

### Stack
 - Serverless for deploying lambdas
 - Typscript
 - RDS mySQL database on AWS
 - yarn (npm) for package managing

### Usefull links:
 - Serverless deployment: https://serverless.com/framework/docs/providers/aws/guide/deploying/

# Production related
Of course this application is not ready for production usecase.
Missing:
 - Proper input validation
 - Error handling
 - Authentication/Authorization
 - Correct logging of errors
 - Much more,...
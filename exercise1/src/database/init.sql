CREATE TABLE IF NOT EXISTS customer (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(512) NOT NULL,
    address varchar(512) NOT NULL,
    iban varchar(25) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    execution_date date NOT NULL,
    amount float NOT NULL,
    description varchar(512) NOT NULL,
    creditor varchar(512) NOT NULL,
    debtor varchar(512) NOT NULL
);

CREATE UNIQUE INDEX customer_iban_index ON customer (iban);
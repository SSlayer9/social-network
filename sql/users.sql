DROP TABLE IF EXISTS users;

CREATE TABLE users
(

    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL CHECK (first <>''),
    last VARCHAR(200) NOT NULL CHECK (last <>''),
    email VARCHAR(200) UNIQUE NOT NULL CHECK (email <>''),
    hashedpass VARCHAR(200) NOT NULL CHECK (hashedpass <>''),
    url VARCHAR
    (300)
);

-- //This lets us add a column without the use of dropping and create a new table
-- ALTER TABLE users
-- ADD COLUMN url VARCHAR
-- (300);

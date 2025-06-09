Create a .env file like for example : 
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=user
DB_NAME=db_name
JWT_SECRET=secret


After creating db create the user

-- First drop the existing user
DROP USER IF EXISTS 'user'@'localhost';

-- Then create the user
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

-- Grant privileges
GRANT ALL PRIVILEGES ON `toinou-template-dev`.\* TO 'user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

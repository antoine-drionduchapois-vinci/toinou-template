After creating db create the user

-- First drop the existing user
DROP USER IF EXISTS 'user'@'localhost';

-- Then create the user
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

-- Grant privileges
GRANT ALL PRIVILEGES ON `toinou-template-dev`.\* TO 'user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

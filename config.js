require('dotenv').config(); // Load environment variables

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD; // Fix typo in 'process'

module.exports = {
    JWT_USER_PASSWORD
};

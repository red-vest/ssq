const dotenv = require('dotenv');

dotenv.config();

export const {PORT} = process.env;
export const dbPath = 'mongodb://localhost/ssq';
export const allSsqData = [];

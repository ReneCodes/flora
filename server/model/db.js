const mongoose = require('mongoose');
const {DB_OWNER, DB_PASS, VAULT, DB_NAME, CLUSTER_EXT} = require('../config');

mongoose.connect(`mongodb+srv://${DB_OWNER}:${DB_PASS}@${VAULT}.${CLUSTER_EXT}.mongodb.net/${DB_NAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

// Check connection
connection.on('connected', () => {
	console.log('connected to db');
});
connection.on('disconnected', () => {
	console.log('disconnected to db');
});
connection.on('error', (error) => {
	console.log('error with db', error);
});

module.exports = mongoose;

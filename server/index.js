const {PORT} = require('./config'); // importing env variables
const express = require('express');
const cors = require('cors');
const router = require('./router');
const mongoose = require('./model/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(router);

app.listen(PORT, () => {
	console.log(`Server on port http://127.0.0.1:${PORT}`);
});

// require('./model/db');
const { PORT } = require('./config'); // importing env variables
const server = require('./app')
// const express = require('express');
// const cors = require('cors');
// const router = require('./router');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '1mb' }));
// app.use(router);

server.listen(PORT, () => {
	console.log(`Server on port http://127.0.0.1:${PORT}`);
});

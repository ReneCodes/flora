require('./model/db');
const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(router);

module.exports = app;

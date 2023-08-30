const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { limiter, dbConnection, PORT } = require('./utils/config');
const handelError = require('./error/HandleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, DATABASE_URL } = process.env;

const app = express();
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : dbConnection);

app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://127.0.0.1',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));

app.use(cookieParser());
app.use(limiter);
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(handelError);

app.listen(PORT);

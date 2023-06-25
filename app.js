const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT, limiter, dbConnection } = require('./utils/config');
const handelError = require('./error/HandleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect(dbConnection);

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

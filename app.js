const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT, limiter } = require('./utils/config');
const handelError = require('./error/HandleError');

const app = express();
mongoose.connect('mongodb://127.0.0.1/bitfilmsdb');

app.use(cookieParser());
app.use(limiter);
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/index'));

app.use(errors());
app.use(handelError);

app.listen(PORT);

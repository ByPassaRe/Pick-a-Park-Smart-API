const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

mongoose.set('useCreateIndex', true);

const userRoute = require('./user/user.router');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use('/users', userRoute);

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');
  app.listen(3000);
  console.log('App listening on port 3000');
});

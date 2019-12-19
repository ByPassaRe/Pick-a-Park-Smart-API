const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const logger = require('./utils/logger');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const userRoute = require('./routes/user/user.router');
const parkingSpotRoute = require('./routes/parkingSpot/parkingSpot.router');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/parkingSpots', parkingSpotRoute);

logger.info('Connecting to database ...');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  })
  .then(() => {
    logger.info('Connected to database');

    app.listen(3000);
    logger.info('App listening on port 3000');
  });

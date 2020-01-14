const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const index = require('./routes/index');
const authenticate = require('./middleware/authenicate');

app.set('view engine', 'pug');
app.set('views', './views')

// Configuration
console.log('Application Name:' + config.get('name'));
console.log('Application Host:' + config.get('mail.host'));
console.log('Application Password:' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...')
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', index)
app.use('/api/courses', courses);

app.use(logger);
app.use(authenticate);



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

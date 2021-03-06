var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//authorization and session configuration
var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var resetRouter = require('./routes/reset.router');
var formRouter= require('./routes/form.router');
var metricsRouter = require('./routes/metrics.router');
var directoryRouter = require('./routes/directory.router');
var searchRouter = require('./routes/autocomplete.router');
var profilesRouter = require('./routes/profiles.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Environment variables
require('dotenv').config();

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/registerRoute', registerRouter);
app.use('/userRoute', userRouter);
app.use('/resetRoute', resetRouter);
app.use('/formRoute', formRouter);
app.use('/metricsRoute', metricsRouter);
app.use('/directoryRoute', directoryRouter);
app.use('/autocompleteRoute', searchRouter);
app.use('/profilesRoute', profilesRouter);


// Catch all bucket, must be last!
app.use('/*', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});

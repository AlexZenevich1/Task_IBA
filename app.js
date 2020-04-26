// Require packages and set the port
const routes = require('./routes/routes');
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use('/public', express.static('public'));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
routes(app);

 
// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});
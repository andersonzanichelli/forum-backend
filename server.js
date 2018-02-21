let express = require('express');
let server = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('config');
let port = process.env.PORT || 9000;
let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 20000 }},
                replset:{ socketOptions: { keepAlive: 1, connectTimeoutMS: 20000 }}
              };
let router = require('./router');

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'error to connect to the database:'));

if(config.util.getEnv('NODE_ENV') !== 'test') {
    server.use(morgan('combined'));
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.text());
server.use(bodyParser.json({ type: 'application/json'}));

router(server);

server.listen(port);
console.log("Ready on port " + port);

module.exports = server;

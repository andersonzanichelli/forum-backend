let express = require('express');
let server = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('config');
let port = 9000;
let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 20000 }},
                replset:{ socketOptions: { keepAlive: 1, connectTimeoutMS: 20000 }}
              };

let categories = require('./app/routes/categoryRouter');
let post = require('./app/routes/postRouter');

mongoose.connect(config.database, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'error to connect to the database:'));

if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.text());
server.use(bodyParser.json({ type: 'application/json'}));

server.get("/", post.getAllPosts);

server.route("/post/:id")
      .get(post.getPost)
      .post(post.setPost)
      .put(post.updatePost);

server.route("/category")
      .get(categories.getCategories)
      .post(categories.setCategory);
      
server.route("/comment/:id")
      .post(forum.postComment)
      .put(forum.updateComment);

server.listen(port);
console.log("Ready on port " + port);

module.exports = server;

const Authentication = require('./app/controllers/authentication');
const Category = require('./app/controllers/category');

module.exports = function(server) {
  server.route('/signup')
        .post(Authentication.signup);

  server.route('/signin')
        .post(Authentication.signin);

server.route('/category')
      .get(Category.getCategories);
}

const passportService = require('./app/services/passport');
const passport = require('passport');
const Authentication = require('./app/controllers/authentication');
const Category = require('./app/controllers/category');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(server) {

server.route('/signup')
      .post(Authentication.signup);

server.route('/signin')
      .post(Authentication.signin);

server.get('/category', requireAuth, Category.getCategories);
}

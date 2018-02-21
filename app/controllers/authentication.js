const jwt = require('jwt-simple');
const User = require('../model/user');
const secrets = require('../../config/secrets');
const bcrypt = require('bcrypt-nodejs');

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  if(!username || !password)
    return res.status(422).send({ error: 'No username and/or password provided!'});

  User.findOne({ username }, (err, existing) => {
    if (err)
      return next(err);

    if (existing)
      return res.status(442).send({ error: 'Username already taken!'});

    encrypt(password, (encripted) => {
      const user = new User({
        username,
        password: encripted,
        role
      });

      user.save((err) => {
        if (err)
          return next(err);

        res.json({ success: true });
      });
    });
  });
}

exports.signin = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, (err, existing) => {
    if (err)
      return next(err);

    if (!existing)
      return res.status(442).send({ error: 'Please, verify the username and/or password'});

    compare(password, existing.password, () => {
      res.json({ token: tokenForUser(existing) });
    });
  });
}

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secrets.secret);
}

function encrypt(text, next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err)
      return next(err);

    bcrypt.hash(text, salt, null, (err, hash) => {
      if (err)
        return next(err);

      next(hash);
    });
  });
}

function compare(text, hash, next) {
  bcrypt.compare(text, hash, (err, res) => {
    if(res === true)
      next();
  });
}

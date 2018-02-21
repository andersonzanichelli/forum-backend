const mongoose = require('mongoose');
const Category = require('../model/category');

function getCategories(req, res, next) {
  let query = Category.find( {}, { title: 1, posts: 1 });
  query.exec((err, categories) => {
    if(err) {
      res.send(err);
      return;
    }

    res.json(categories);
  });
}

function setCategory(req, res, next) {
  var newCategory = new Category(req.body);
  newCategory.save((err, category) => {
    if(err) {
      res.send(err);
      return;
    }

    res.json({ message: 'Category successfully added', category });
  });
}

module.exports = { getCategories, setCategory };

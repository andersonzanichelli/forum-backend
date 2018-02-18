let mongoose = require('mongoose');
let Category = require('../model/category');

function getCategories(req, res) {
  let query = Category.find( {}, { title: 1, description: 1 });
  query.exec((err, categories) => {
    if(err) {
      res.send(err);
      return;
    }

    res.json(categories);
  });
}

function setCategory(req, res) {
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

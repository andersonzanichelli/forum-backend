let mongoose = require('mongoose');
let Category = require('../model/category');

function getCategories(req, res) {
  let query = Category.find({});
  query.exec((err, categories) => {
    if(err)
      res.send(err);
    res.json(categories);
  });
}

function setCategory(req, res) {
  var newCategory = new Category(req.body);
  newCategory.save((err, category) => {
    if(err)
      res.send(err);
    res.json({ message: 'Category successfully added', category });
  });
}

module.exports = { getCategories, setCategory };

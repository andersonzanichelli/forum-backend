let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('category', CategorySchema);

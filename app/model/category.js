let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('category', CategorySchema);

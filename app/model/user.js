const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    password: String,
    role: [{ type: String, required: true }]
  }
);

const ModelClass = mongoose.model('user', UserSchema)

module.exports = ModelClass;

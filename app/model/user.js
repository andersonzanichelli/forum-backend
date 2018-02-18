let mongoose = require('morgoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('user', UserSchema);

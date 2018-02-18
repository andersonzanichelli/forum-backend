let mongoose = require('morgoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema(
  {
    owner: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    comment: { type: String, require: true }
  },
  {
    versionKey: false
  }
);

CommentSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt)
    this.createdAt = now;

  next();
});

module.exports = mongoose.model('comment', CommentSchema);

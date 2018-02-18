let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema(
  {
    owner: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    comment: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
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

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema(
  {
    owner: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    comment: { type: String, require: true },
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

let Post = mongoose.model('Post', PostSchema);

module.exports = mongoose.model('comment', CommentSchema);

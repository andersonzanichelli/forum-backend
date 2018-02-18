let mongoose = require('morgoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    owner: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, require: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    versionKey: false
  }
);

PostSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt)
    this.createdAt = now;

  next();
});

let Comment = mongoose.model('Comment', CommentSchema);
module.exports = mongoose.model('post', PostSchema);

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    owner: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
    category: { type: String, required: true }
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

module.exports = mongoose.model('post', PostSchema);

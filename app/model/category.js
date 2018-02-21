const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    posts: [{
      title: { type: String, required: true },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
      content: { type: String, required: true },
      comments: [{
        text: { type: String, required: true },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
      }]
    }]
  }
);

CategorySchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt)
    this.createdAt = now;

  next();
});

const ModelClass = mongoose.model('category', CategorySchema)

module.exports = ModelClass;

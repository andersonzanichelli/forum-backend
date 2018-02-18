let mongoose = require('mongoose');
let Comment = require('../model/comment');

function getAllComments(req, res) {
  let query = Comment.find({ post: req.params.post_id});
  query.exec((err, comments) => {
    if(err)
      res.send(err);

    res.json(comments);
  });
}

function setComment(req, res) {
  var newComment = new Comment(req.body);
  newComment.save((err, comment) => {
    if(err)
      res.send(err);

    res.json({ message: 'Comment successfully added', comment });
  });
}

function updateComment(req, res) {
    Comment.findById({_id: req.params.id}, (err, comment) => {
        if(err)
          res.send(err);

        Object.assign(comment, req.body).save((err, comment) => {
            if(err)
              res.send(err);

            res.json({ message: 'Comment updated!', comment });
        });
    });
}

module.exports = { getAllComments, setComment, updateComment };

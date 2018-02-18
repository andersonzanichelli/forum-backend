let mongoose = require('mongoose');
let Post = require('../model/post');

function getAllPosts(req, res) {
  let query = Post.find({});
  query.exec((err, posts) => {
    if(err) {
      res.send(err);
      return;
    }

    res.json(posts);
  });
}

function getPost(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if(err) {
      res.send(err);
      return;
    }

    res.json(post);
  });
}

function setPost(req, res) {
  var newPost = new Post(req.body);
  newPost.save((err, post) => {
    if(err) {
      res.send(err);
      return;
    }

    res.json({ message: 'Post successfully added', post });
  });
}

function updatePost(req, res) {
    Post.findById({_id: req.params.id}, (err, post) => {
        if(err) {
          res.send(err);
          return;
        }

        Object.assign(post, req.body).save((err, post) => {
            if(err) {
              res.send(err);
              return;
            }

            res.json({ message: 'Post updated!', post });
        });
    });
}

module.exports = { getAllPosts, getPost, setPost, updatePost };

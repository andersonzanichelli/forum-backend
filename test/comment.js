process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Comment = require('../app/model/comment');
let Post = require('../app/model/post');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Comments', () => {
    beforeEach((done) => {
        Comment.remove({}, (err) => {
           done();
        });
    });
});

describe('/GET comment', () => {
    it('it should GET all the comments', (done) => {
      chai.request(server)
          .get('/comment/getAllComments')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    });
});

describe('/POST comment', () => {
  it('it should not POST a comment without owner', (done) => {
    let comment = {
        comment: 'A simple comment'
    }
    chai.request(server)
        .post('/comment/setComment')
        .send(comment)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('owner');
            res.body.errors.owner.should.have.property('kind').eql('required');
          done();
        });
    });

    it('it should not POST a comment without a text', (done) => {
      let comment = {
          owner: 'James Lake'
      }
      chai.request(server)
          .post('/comment/setComment')
          .send(comment)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('comment');
              res.body.errors.comment.should.have.property('kind').eql('required');
            done();
          });
      });

      it('it should POST a comment successfully', (done) => {
        let post = new Post( { owner: 'James Lake', content: 'A simple post', category: 'Some Category' } )
        post.save((err, post) => {
          let comment = {
              owner: 'James Lake',
              comment: 'A simple comment',
              post: post.id
          }
          chai.request(server)
              .post('/comment/setComment')
              .send(comment)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.not.have.property('errors');
                  res.body.message.should.be.eql('Comment successfully added');
                done();
              });
        });
      });
});

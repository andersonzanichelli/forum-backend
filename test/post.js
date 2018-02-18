process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Post = require('../app/model/post');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Posts', () => {
    beforeEach((done) => {
        Post.remove({}, (err) => {
           done();
        });
    });
});

describe('/GET post', () => {
    it('it should GET all the posts', (done) => {
      chai.request(server)
          .get('/')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    });
});

describe('/POST comment', () => {
  it('it should not POST a post without owner', (done) => {
      let post = {
        content: 'A new post',
        category: 'In some category'
      }
      chai.request(server)
          .post('/post/setPost')
          .send(post)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('owner');
              res.body.errors.owner.should.have.property('kind').eql('required');
            done();
          });
    });

    it('it should not POST a post without content', (done) => {
        let post = {
          owner: 'Clara Nunes',
          category: 'In some category'
        }
        chai.request(server)
            .post('/post/setPost')
            .send(post)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('content');
                res.body.errors.content.should.have.property('kind').eql('required');
              done();
            });
      });

      it('it should not POST a post without category', (done) => {
          let post = {
            owner: 'Clara Nunes',
            content: 'A new post'
          }
          chai.request(server)
              .post('/post/setPost')
              .send(post)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('category');
                  res.body.errors.category.should.have.property('kind').eql('required');
                done();
              });
        });
});

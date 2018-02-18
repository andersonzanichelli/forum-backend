process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Category = require('../app/model/category');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Categories', () => {
    beforeEach((done) => {
        Category.remove({}, (err) => {
           done();
        });
    });
});

describe('/GET category', () => {
    it('it should GET all the categories', (done) => {
      chai.request(server)
          .get('/category')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    });
});

describe('/POST category', () => {
  it('it should not POST a category without title', (done) => {
      let category = {
          description: 'A datascience forum'
      }
      chai.request(server)
          .post('/category')
          .send(category)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('title');
              res.body.errors.title.should.have.property('kind').eql('required');
            done();
          });
    });

    it('it should not POST a category without description', (done) => {
      let category = {
          title: 'Datascience'
      }
      chai.request(server)
          .post('/category')
          .send(category)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('description');
              res.body.errors.description.should.have.property('kind').eql('required');
            done();
          });
    });

    it('it should POST a category successfully', (done) => {
        let category = {
            title: 'Datascience',
            description: 'A datascience forum'
        }
        chai.request(server)
            .post('/category')
            .send(category)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.not.have.property('errors');
                res.body.message.should.be.eql('Category successfully added');
              done();
            });
      });
});

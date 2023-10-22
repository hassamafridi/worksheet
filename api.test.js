const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should save a worksheet via POST request', (done) => {
    chai.request(app)
      .post('/worksheets')
      .send({
        question: 'What is 2 + 2?',
        options: [
          { option: '3', correct: false },
          { option: '4', correct: true },
          { option: '5', correct: false },
        ],
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('question');
        expect(res.body).to.have.property('options');
        done();
      });
  });

  it('should retrieve worksheets via GET request', (done) => {
    chai.request(app)
      .get('/worksheets')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
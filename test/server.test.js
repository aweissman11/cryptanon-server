const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const assets = require('../seedData/seedData.js');
const expect = require('chai').expect;
const should = chai.should();
chai.use(chaiHttp);

describe('Server File', () => {

  describe('/api/v1/assets', () => {
    
    beforeEach(done => {
      app.locals.assets = assets;
      done();
    })

    it('Return a 200 status', (done) => {
      chai.request(app)
        .get('/api/v1/assets')
        .end((error, response) => {
          expect(response).to.have.status(200);
          done()
        })
    })

    it('Returns array of assets', (done) => {
      chai.request(app)
        .get('/api/v1/assets')
        .end((error, response) => {
          response.body.should.be.a('array');
          expect(response.body.length).to.equal(50)
          done()
        })
    })

   

    // it('Return a 200 status', (done) => {
      
    // })

    // it('Return a 200 status', (done) => {
      
    // })

  })
})
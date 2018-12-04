const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const assets = require('../seedData/seedData.js');
const expect = require('chai').expect;
const should = chai.should();
chai.use(chaiHttp);

describe('Server File', () => {

  describe('/api/v1/assets', () => {
    let BitcoinID;
    beforeEach(done => {
      app.locals.assets = assets;
      done();
    })

    it('Return a 200 status', (done) => {
      chai.request(app)
        .get('/api/v1/assets')
        .end((error, response) => {
          BitcoinID = response.body[0].id
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

    it('Returns prices for specific asset', (done) => {
      chai.request(app)
        .get(`/api/v1/assets/${BitcoinID}/asset_prices`)
        .end((error, response) => {
          response.body.should.be.a('array');
          expect(response.body.length).to.equal(382);
          done()
        })
    })


   

    // it('Return a 200 status', (done) => {
      
    // })

    // it('Return a 200 status', (done) => {
      
    // })

  })
})
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const assets = require('../seedData/seedData.js');
const expect = require('chai').expect;
const should = chai.should();
chai.use(chaiHttp);

let BitcoinID;

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
  })
  
  describe('/api/v1/assets/:asset_ID/asset_prices', () => {

    it('Returns prices for specific asset', (done) => {
      chai.request(app)
      .get(`/api/v1/assets/${BitcoinID}/asset_prices`)
      .end((error, response) => {
        response.body.should.be.a('array');
        expect(response.body.length).to.equal(382);
        done()
      })
    })
  })

  describe('/api/v1/users', () => {
    let newUserId;

    it('should add a user', (done) => {
      const newUser = {
        username: 'gmoney',
        password: 'hello'
      }

      chai.request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((error, response) => {
          expect(response).to.have.status(201)
          newUserId = response.body.id
          expect(Object.keys(response.body)).to.deep.equal(['username', 'id'])
          done()
        })
    })

    it('should get all the users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((error, response) => {
          expect(response).to.have.status(200)
          done()
        })
      })
      
      it('should delete a user', (done) => {
        console.log('newuserid:', newUserId)
        chai.request(app)
          .delete(`/api/v1/users/${newUserId}`)
          .end((error, response) => {
            expect(response.status).to.equal(204)
            done()
          })
        
    })

  })
  


})
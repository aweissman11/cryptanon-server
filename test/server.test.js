const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const expect = require('chai').expect;
const config = require('../knexfile')['test']
const database = require('knex')(config)

const should = chai.should();
chai.use(chaiHttp);

// database.seed.run()

let BitcoinID;

describe('Server File', () => {
  
  // beforeEach((done) => {
  //   database.migrate.rollback()
  //   .then(() => {
  //     database.migrate.latest()
  //     .then(() => {
  //       database.seed.run()
  //       .then(() => {
  //         done();
  //       })
  //     });
  //   });
  // });

  // afterEach((done) => {
  //   database.migrate.rollback()
  //   .then(() => {
  //     done();
  //   });
  // });

 
  // describe('/api/v1/assets', () => {
    
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
  // })
  
  // describe('/api/v1/assets/:asset_ID/asset_prices', () => {

    it('Returns prices for specific asset', (done) => {
      chai.request(app)
      .get(`/api/v1/assets/${BitcoinID}/asset_prices`)
      .end((error, response) => {
        response.body.should.be.a('array');
        expect(response.body.length).to.equal(382);
        done()
      })
    })
  // })

  // describe('/api/v1/users', () => {
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

    it('should change a specific user username' , (done) => {
      chai.request(app)
        .patch(`/api/v1/users/username/${newUserId}`)
        .send( { username: 'Aaron' } )
        .end((error, response) => {
          expect(response).to.have.status(204)
          done()
        })
    })

    it('should change a specific user password' , (done) => {
      chai.request(app)
        .patch(`/api/v1/users/password/${newUserId}`)
        .send( { password: 'hello111' } )
        .end((error, response) => {
          expect(response).to.have.status(204)
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
      chai.request(app)
        .delete(`/api/v1/users/${newUserId}`)
        .end((error, response) => {
          expect(response.status).to.equal(204)
          done()
        })
    })
  })
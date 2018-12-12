const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, cleanPrices, cleanArticles} = require('../server.js');
const expect = require('chai').expect;
// const config = require('../knexfile')[process.env.NODE_ENV]

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const should = chai.should();
chai.use(chaiHttp);

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

  it('Returns a 404 status', done => {
    chai
      .request(app)
      .get('/api/v1/ass')
      .end((error, response) => {
        expect(response).to.have.status(404);
        done();
      });
  });

  describe('/api/v1/merchants', () => {
    beforeEach(done => {
      database.migrate.rollback().then(() => {
        database.migrate.latest().then(() => {
          database.seed.run().then(() => {
            done();
          });
        });
      });
    });

    it('Return a 200 status', done => {
      chai
        .request(app)
        .get('/api/v1/merchants')
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });

    describe('cleanPrices', () => {
      let mockAssets = [
        {
          id: 1,
          name: 'Bitcoin',
          ticker: 'BTC',
          type: 'cryptocurrency',
          icon_url: 'https://cdn.coinranking.com/Sy33Krudb/btc.svg',
          website_url: 'https://bitcoin.org',
          created_at: '2018-12-10T21:31:39.149Z',
          updated_at: '2018-12-10T21:31:39.149Z',
          prices: [],
          articles: [],
        },
      ];
      let mockPrices = [
        {
          id: 1,
          price: '12746.9771435992',
          pricing_date: '1512604800000',
          asset_id: 1,
          created_at: '2018-12-10T21:31:39.169Z',
          updated_at: '2018-12-10T21:31:39.169Z',
        },
        {
          id: 2,
          price: '15229.6409018201',
          pricing_date: '1512691200000',
          asset_id: 1,
          created_at: '2018-12-10T21:31:39.182Z',
          updated_at: '2018-12-10T21:31:39.182Z',
        },
      ];

      it('should return a clean merge array', () => {
        let result = cleanPrices(mockAssets, mockPrices);
        expect(result[0])
          .to.have.property('prices')
          .with.lengthOf(2);
      });
    });

    describe('cleanArticles', () => {
      let mockAssets = [
        {
          id: 1,
          name: 'Bitcoin',
          ticker: 'BTC',
          type: 'cryptocurrency',
          icon_url: 'https://cdn.coinranking.com/Sy33Krudb/btc.svg',
          website_url: 'https://bitcoin.org',
          created_at: '2018-12-10T21:31:39.149Z',
          updated_at: '2018-12-10T21:31:39.149Z',
          prices: [],
          articles: [],
        },
      ];
      let mockArticles = [
        {
          id: 2,
          source: 'Lifehacker.com',
          author: 'Brendan Hesse',
          title:
            "What You Need to Know About HTC's Exodus 1, the 'Blockchain Smartphone'",
          url:
            'https://lifehacker.com/what-you-need-to-know-about-htcs-exodus-1-the-blockcha-1830836727',
          urlToImage:
            'https://i.kinja-img.com/gawker-media/image/upload/s--i3xzLyJh--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/mjshqherec29uurktgyb.jpg',
          publishedAt: '2018-12-05T17:00:00Z',
          content:
            'Nothing has signaled that weve finally entered the cyber future more than the rise of blockchain networks and cryptocurrency. And that makes HTCs upcoming blockchain-based smartphone, the HTC Exodus 1, one of the most cyberpunk (and strange) devices yet. As w… [+7892 chars]',
          asset_id: 1,
          created_at: '2018-12-10T21:31:39.323Z',
          updated_at: '2018-12-10T21:31:39.323Z',
        },
        {
          id: 3,
          source: 'Wired',
          author: 'Noam Cohen',
          title: "A 1970s Essay Predicted Silicon Valley's High-Minded Tyranny",
          url:
            'https://www.wired.com/story/silicon-valley-tyranny-of-structurelessness/',
          urlToImage:
            'https://media.wired.com/photos/5beca835e845c10dba280412/191:100/pass/Ideas_Art_Structureless-Noam.jpg',
          publishedAt: '2018-11-15T12:00:00Z',
          content:
            'Jo Freeman is one of those people whom Kipling would praise for keeping her head while those all around are losing theirs. The womens liberation movement of the late 1960s was rebuilding the world in a consciously different way: no designated leaders and no r… [+7147 chars]',
          asset_id: 1,
          created_at: '2018-12-10T21:31:39.323Z',
          updated_at: '2018-12-10T21:31:39.323Z',
        },
      ];

      it('should return a clean merge array', () => {
        let result = cleanArticles(mockAssets, mockArticles);
        expect(result[0])
          .to.have.property('articles')
          .with.lengthOf(2);
      });
    });

    it('Returns array of assets', done => {
      chai
        .request(app)
        .get('/api/v1/merchants')
        .end((error, response) => {
          response.body.should.be.a('array');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('ticker');
          response.body[0].should.have.property('type');
          response.body[0].should.have.property('icon_url');
          response.body[0].should.have.property('website_url');
          response.body[0].should.have.property('prices');
          response.body[0].should.have.property('articles');
          response.body[0].should.have.property('id');
          expect(response.body.length).to.equal(2);
          done();
        });
    });
  });

  describe('/api/v1/assets', () => {
    beforeEach(done => {
      database.migrate.rollback().then(() => {
        database.migrate.latest().then(() => {
          database.seed.run().then(() => {
            done();
          });
        });
      });
    });

    it('Return a 200 status', done => {
      chai
        .request(app)
        .get('/api/v1/assets')
        .end((error, response) => {
          BitcoinID = response.body[0].id;
          expect(response).to.have.status(200);
          done();
        });
    });

    it('Returns array of assets', done => {
      chai
        .request(app)
        .get('/api/v1/assets')
        .end((error, response) => {
          response.body.should.be.a('array');
          expect(response.body.length).to.equal(2);
          done();
        });
    });
  });

  describe('/api/v1/assets/:asset_ID/asset_prices', () => {
    beforeEach(done => {
      database.migrate.rollback().then(() => {
        database.migrate.latest().then(() => {
          database.seed.run().then(() => {
            done();
          });
        });
      });
    });

    it('Returns prices for specific asset', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/${BitcoinID}/asset_prices`)
        .end((error, response) => {
          response.body.should.be.a('array');
          expect(response.body.length).to.be.greaterThan(350);
          done();
        });
    });

    it('Returns an error if the asset doesnt exist', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/0000/asset_prices`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });

    it('Returns prices for specific asset', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/${BitcoinID}/asset_prices`)
        .end((error, response) => {
          response.body.should.be.a('array');
          expect(response.body.length).to.be.greaterThan(350);
          done();
        });
    });

    it('Returns an error if the asset doesnt exist', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/0000/asset_prices`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });

    it('Returns articles for specific asset', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/${BitcoinID}/articles`)
        .end((error, response) => {
          response.body.should.be.a('array');
          expect(response.body.length).to.be.greaterThan(5);
          done();
        });
    });

    it('Returns an error if the asset doesnt exist', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/0000/asset_prices`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });

    it('Returns the full list of asset prices if a date is not entered', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/${BitcoinID}/asset_prices`)
        .end((error, response) => {
          expect(response.body.length).to.be.greaterThan(25);
          expect(response).to.have.status(200);
          done();
        });
    });

    it('Returns a specific date range of pricing data for specific asset', done => {
      chai
        .request(app)
        .get(`/api/v1/assets/${BitcoinID}/asset_prices?uniDate=1515110400000`)
        .end((error, response) => {
          response.body.should.be.a('array');
          expect(response.body.length).to.be.greaterThan(25);
          done();
        });
    });
  });

  describe('/api/v1/users', () => {
    let newUserId;

    it('should add a user', done => {
      const newUser = {
        username: 'gmoney',
        password: 'hello',
      };

      chai
        .request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((error, response) => {
          expect(response).to.have.status(201);
          newUserId = response.body.id;
          expect(Object.keys(response.body)).to.deep.equal(['username', 'id']);
          done();
        });
    });

    it('should return the correct error if a param is missing', done => {
      const newUser = {
        username: 'gmoney',
        // password: 'hello'
      };

      chai
        .request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body).to.deep.equal({
            error: 'missing required param/s: password',
          });
          done();
        });
    });

    it('should change a specific user username', done => {
      chai
        .request(app)
        .patch(`/api/v1/users/username/${newUserId}`)
        .send({username: 'Aaron'})
        .end((error, response) => {
          expect(response).to.have.status(204);
          done();
        });
    });

    it('should not change a username if a new username is not specified', done => {
      chai
        .request(app)
        .patch(`/api/v1/users/username/${newUserId}`)
        .send({name: 'Aaron'})
        .end((error, response) => {
          expect(response).to.have.status(422);
          done();
        });
    });

    it('should change a specific user password', done => {
      chai
        .request(app)
        .patch(`/api/v1/users/password/${newUserId}`)
        .send({password: 'hello111'})
        .end((error, response) => {
          expect(response).to.have.status(204);
          done();
        });
    });

    it('should not change a password if a new password is not specified', done => {
      chai
        .request(app)
        .patch(`/api/v1/users/password/${newUserId}`)
        .send({name: 'Aaron'})
        .end((error, response) => {
          expect(response).to.have.status(422);
          done();
        });
    });

    it('should get all the users', done => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });

    it('should delete a user', done => {
      const newUser = {
        username: 'gmoney',
        password: 'hello',
      };

      chai
        .request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((error, response) => {
          expect(response).to.have.status(201);
          newUserId = response.body.id;
          expect(Object.keys(response.body)).to.deep.equal(['username', 'id']);
          // done()
        });

      chai
        .request(app)
        .delete(`/api/v1/users/${newUserId}`)
        .end((error, response) => {
          expect(response.status).to.equal(204);
          done();
        });
    });

    it('should not delete a user if one does not exist', done => {
      const newUser = {
        username: 'gmoney',
        password: 'hello',
      };

      chai
        .request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((error, response) => {
          expect(response).to.have.status(201);
          newUserId = response.body.id;
          expect(Object.keys(response.body)).to.deep.equal(['username', 'id']);
          // done()
        });

      chai
        .request(app)
        .delete(`/api/v1/users/000`)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });

    it('should add a favorite and get all of a users favorites', done => {
      const newUser = {
        user_id: 2,
        asset_id: 1,
      };

      chai
        .request(app)
        .post('/api/v1/favorites')
        .send(newUser)
        .end((error, response) => {
          expect(response).to.have.status(201);
          newUserId = response.body.id;
          expect(Object.keys(response.body)).to.deep.equal([
            'asset_id',
            'user_id',
            'id',
          ]);
          done();
        });

      // chai.request(app)
      // .get(`/api/v1/favorites/${newUserId}`)
      //   .end((error, response) => {
      //     expect(response).to.have.status(200)
      //     response.body.should.be.a('array');
      //     done()
      //   })
    });

    it('should not add a favorite if a param is missing', done => {
      const favorite = {
        user_id: 2,
        // asset_id: 1
      };

      chai
        .request(app)
        .post('/api/v1/favorites')
        .send(favorite)
        .end((error, response) => {
          expect(response).to.have.status(422);
          done();
        });
    });

    it('should delete a favorite', done => {
      const favorite = {
        user_id: 2,
        asset_id: 1,
      };

      chai
        .request(app)
        .post('/api/v1/favorites')
        .send(favorite)
        .end((error, response) => {
          expect(response).to.have.status(201);
        });

      chai
        .request(app)
        .delete(`/api/v1/favorites/1`)
        .end((error, response) => {
          expect(response.status).to.equal(204);
          done();
        });
    });

    it('should not delete a favorite if one does not exist', done => {
      const favorite = {
        user_id: 2,
        asset_id: 1,
      };

      chai
        .request(app)
        .post('/api/v1/favorites')
        .send(favorite)
        .end((error, response) => {
          expect(response).to.have.status(201);
        });

      chai
        .request(app)
        .delete(`/api/v1/favorites/10`)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
});

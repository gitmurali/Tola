const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');


describe('Driver controller', (done) => {
  it('post to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({email: 'murali@test.com'})
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('GET to /api/drivers finds drivers in a location', done => {
    const xDriver = new Driver({
      email: 'x@test.com',
      geometry: {type: 'Point', coordinates: [-123.3323234, 47.7655678]}
    });
    const yDriver = new Driver({
      email: 'y@test.com',
      geometry: {type: 'Point', coordinates: [-80.234, 25.798]}
    });

    Promise.all([xDriver.save(), yDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].obj.email === 'y@test.com');
            done();
          })
      });
  });
});
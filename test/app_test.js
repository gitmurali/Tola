const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
    it('handles the get request to /api', (done) => {
        request(app)
          .get('/api')
          .expect(200, done);
    });
    it('expects response', (done) => {
       request(app)
         .get('/api')
         .end((error, response) => {
           assert(response.body.hi === 'there');
           done();
         });
    });
});
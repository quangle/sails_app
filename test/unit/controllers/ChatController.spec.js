var request = require('supertest');
var assert = require('assert');
var sinon = require('sinon');

describe('ChatController', function() {
  describe('POST addConv', function() {
    describe('user and message are present', function() {
      it('returns success true', function(done) {
        request(sails.hooks.http.app)
          .post('/chat/addConv')
          .send({ user: 'quang', message: 'hello' })
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.deepEqual(res.body, { success: true });
            done();
          });
      })
    })

    describe('user and message are not present', function() {
      it('returns success false', function(done) {
        request(sails.hooks.http.app)
          .post('/chat/add_conv')
          .send({ user: '', message: '' })
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.deepEqual(res.body, { success: false });
            done();
          });
      })
    })
  })

  describe('GET addConv', function() {
    before(function(done) {
      sinon.spy(Chat, "watch");
      done();
    });

    it('subscribes to publishCreate events for Chat model', function(done) {
      request(sails.hooks.http.app)
        .get('/chat/add_conv')
        .send()
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          assert(Chat.watch.calledOnce);
          assert.deepEqual(res.body, { success: true });
          done();
        });
    })

    after(function(done) {
      Chat.watch.restore();
      done();
    });
  })
})

var demand = require("must");
var assert = require('assert');

describe('Chat', function() {
  describe('validations', function() {
    describe('user and message is empty', function() {
      it('does not create the Chat', function(done) {
        var chat = new Chat._model({
          user: "",
          message: ""
        });

        chat.validate(function (err) {
          err.must.exist();
          done();
        });
      })
    })

    describe('user and message is present', function() {
      it('creates the Chat successfully', function(done) {
        var chat = new Chat._model({
          user: "name",
          message: "message"
        });

        chat.validate(function (err) {
          demand(err).not.to.exist();
          done();
        });
      })
    })
  })
})

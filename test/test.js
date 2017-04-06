const supertest = require("supertest")
    , assert = require("assert")
    , app = require ("../index.js")

exports.get_user_should_exist = function(done){
  supertest(app)
  .get("/getCurrentUser")
  .end(function(err, res){
    assert.ifError(err);
    assert.ok(res.status !== 404)
    done()
  })
}

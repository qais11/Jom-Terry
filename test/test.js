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
exports.heigh_score_should_be_integer = function(done){
  supertest(app)
  .get("/getHighScore")
  .expect(200)
  .end(function(err, res){
    assert.ifError(err);
    assert.ok(typeof res.body.high_score === "number")
    done()
  })
}
// exports.unkown_user_should_be_gust = function(done){
//   supertest(app)
//   .get("/getHighScore")
//   .end(function(err, res){
//     assert.ifError(err);
//     assert.ok(res.user === {id: 3})
//     done()
//   })
// }

const massive = require('massive');
const connectionString = "postgres://macuser@localhost/macuser";
const massiveInstance = massive.connectSync({connectionString : connectionString})
module.exports = massiveInstance

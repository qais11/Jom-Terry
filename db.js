const massive = require('massive');
const config = require('./config');
const connectionString = config.connectionString;
const massiveInstance = massive.connectSync({connectionString : connectionString})
module.exports = massiveInstance
// done

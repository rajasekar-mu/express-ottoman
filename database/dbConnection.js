var {Ottoman} = require('ottoman');
const dbConfig = require('../config/database.js');
const ottoman = new Ottoman({collectionName: '_default'});
ottoman.connect({
      connectionString: dbConfig.host,
      bucketName: dbConfig.bucketName,
      username: dbConfig.userName,
      password: dbConfig.password,
});
module.exports = {ottomanConnection:ottoman};

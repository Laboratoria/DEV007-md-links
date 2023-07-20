const fs = require('fs');

module.exports = {
  statSync: fs.statSync,
  readdirSync: fs.readdirSync,
  readFileSync: fs.readFileSync,
  resolve: require.resolve,
};

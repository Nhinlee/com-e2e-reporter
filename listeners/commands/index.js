const { sampleCommandCallback } = require('./sample-command');

module.exports.register = (app) => {
  app.command('/com-e2e', sampleCommandCallback);
};

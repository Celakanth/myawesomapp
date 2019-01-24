var config = require('./config.json');
var configEnv = config["URL"];
Object.keys(configEnv).forEach((key) => {
  process.env[key] = configEnv[key];
});

var config = require('./config.json');
console.log(config);
var configEnv = config["URL"];
Object.keys(configEnv).forEach((key) => {
  console.log([key]);
  process.env[key] = configEnv[key];
});

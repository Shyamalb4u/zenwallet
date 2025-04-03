const { prototype } = require("jsonwebtoken/lib/JsonWebTokenError");

const config = {
  user: "zenwallet_user", // Database username
  password: "ZWd597Cn*Dat", // Database password
  server: "103.69.196.81", // Server IP address
  database: "zenwallet_data", // Database name
  options: {
    encrypt: false, // Disable encryption
  },
  port: 1533,
};

module.exports = config;

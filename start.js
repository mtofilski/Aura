require("@babel/register")({
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-transform-runtime"]
  }); 
 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

 module.exports = require('./Application/app.js')
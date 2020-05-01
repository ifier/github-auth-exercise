const axios = require('axios');
const fs = require('fs');
const qs = require('querystring');
const express = require('express');
const app = express();


const TRUNCATE_THRESHOLD = 10;
const REVEALED_CHARS = 3;
const REPLACEMENT = '***';

// Load config defaults from JSON file.
// Environment variables override defaults.
function loadConfig() {
  const config = JSON.parse(fs.readFileSync(__dirname + '/../src/config/config.json', 'utf-8'));
  log('Configuration');
  for (let i in config) {
    log(i + ':', config[i], true);
  }
  return config;
}

const config = loadConfig();

function authenticate(code) {
  const data = {
    client_id: config.oauth_client_id,
    client_secret: config.oauth_client_secret,
    code: code
  };

  return axios.post('https://github.com/login/oauth/access_token', data);
}

/**
 * @param {string} label - label for the log message
 * @param {Object||string} value - the actual log message, can be a string or a plain object
 * @param {boolean} sanitized - should the value be sanitized before logging?
 */
function log(label = '', value = '', sanitized = false) {
  value = value || '';
  if (sanitized) {
    if (typeof(value) === 'string' && value.length > TRUNCATE_THRESHOLD){
      console.log(label, value.substring(REVEALED_CHARS, 0) + REPLACEMENT);
    } else {
      console.log(label, REPLACEMENT);
    }
  } else {
    console.log(label, value);
  }
}


// Convenience for allowing CORS on routes - GET only
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/authenticate/:code', function(req, res) {
  log('authenticating code:', req.params.code, true);
  authenticate(req.params.code)
    .then(response => {
      const parsedData = qs.parse(response.data);
      if (parsedData.access_token) {
        log(parsedData.access_token);
        res.json(parsedData);
        return;
      }

      log(parsedData.error);
      res.status(500).json(parsedData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports.config = config;
module.exports.app = app;

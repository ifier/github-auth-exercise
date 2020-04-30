const https = require('https');
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
  const config = JSON.parse(fs.readFileSync(__dirname+ '/config.json', 'utf-8'));
  log('Configuration');
  for (let i in config) {
    let configItem = config[i];
    if (typeof configItem === "string") {
      configItem = configItem.trim();
    }
    config[i] = configItem;
    if (i === 'oauth_client_id' || i === 'oauth_client_secret') {
      log(i + ':', config[i], true);
    } else {
      log(i + ':', config[i]);
    }
  }
  return config;
}

const config = loadConfig();

function authenticate(code, cb) {
  const data = qs.stringify({
    client_id: config.oauth_client_id,
    client_secret: config.oauth_client_secret,
    code: code
  });

  const reqOptions = {
    host: config.oauth_host,
    port: config.oauth_port,
    path: config.oauth_path,
    method: config.oauth_method,
    headers: { 'content-length': data.length }
  };

  let body = "";
  const req = https.request(reqOptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) { body += chunk; });
    res.on('end', function() {
      cb(null, qs.parse(body).access_token);
    });
  });

  req.write(data);
  req.end();
  req.on('error', function(e) { cb(e.message); });
}

/**
 * Handles logging to the console.
 * Logged values can be sanitized before they are logged
 *
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
  authenticate(req.params.code, function(err, token) {
    let result;
    if ( err || !token ) {
      result = {"error": err || "bad_code"};
      log(result.error);
    } else {
      result = {"token": token};
      log("token", result.token, true);
    }
    res.json(result);
  });
});

module.exports.config = config;
module.exports.app = app;

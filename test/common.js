/**
 * Contains helper code that is used by the tests.
 */
'use strict';
const fs = require('fs');

// Paths to the generated files, if you move files around change paths here.
exports.file = {
  cfignore: '.cfignore',
  Dockerfile: 'Dockerfile',
  Dockerfile_tools: 'Dockerfile-tools',
  gitignore: '.gitignore',
  manifest_yml: 'manifest.yml',
  package_json: 'package.json',
  pipeline_yml: '.bluemix/pipeline.yml',
  README_md: 'README.md',
  server_js: 'server.js',
  vcap_local_js: 'vcap-local.js'
};

// Paths to the partial files, if you change them or add more change these vars
exports.partial = {
  appid_api: 'refresh/templates/partials/appid-api-strategy.ejs',
  cloudant: 'refresh/templates/partials/cloudant.ejs',
  objectStorage: 'refresh/templates/partials/objectStorage.ejs',
  appid_webapp: 'refresh/templates/partials/appid-webapp-strategy.ejs',
  mongo: 'refresh/templates/partials/mongo.ejs',
  redis: 'refresh/templates/partials/redis.ejs',
  monitoring: 'refresh/templates/partials/monitoring.ejs',
};

// Read a partial
exports.readPartial = function(rootPath, partialPath) {
  return fs.readFileSync(rootPath + partialPath, 'utf8');
}

// Default port defined in app/index.js.
exports.defaultPort = 8080;

// The npm start command.
exports.npmStart = "node server.js"

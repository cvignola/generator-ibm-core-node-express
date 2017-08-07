/**
 * Contains helper code that is used by the tests.
 */
'use strict';

// Paths to the generated files, if you move files around change paths here.
exports.file = {
  gitignore: '.gitignore',
  package_json: 'package.json',
  README_md: 'README.md',
  server_js: 'server/server.js',
  index_html: 'public/index.html',
  local: 'server/config/local.json',
  health: 'server/routers/health.js',
  index_router: 'server/routers/index.js',
  public: 'server/routers/public.js',
  index_service: 'server/services/index.js',
  cliconfig: 'cli-config.yml'
};

// Default port defined in app/index.js.
exports.defaultPort = 3000;

// The npm start command.
exports.npmStart = "node server.js";

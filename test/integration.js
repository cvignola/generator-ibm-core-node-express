/**
 * Tests here do not stub out the subgenerators, so for the app generator
 * the real build and refresh subgenerators get called.
 */
'use strict';
const common = require('./common.js');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('core-node-express:app integration test with fallback credentials', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../app'))
    .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.file).map((key) => common.file[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.file.local, function () {
    it('contains the default port', function () {
      assert.jsonFileContent(common.file.local, {port: 3000});
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "version": "1.0.0",
        "description": "A generated Bluemix application",
        "private": true,
        "engines": {
          "node": "^6.9.0"
        },
        "scripts": {
          "start": "node server/server.js",
          "test": "nyc mocha"
        },
        "dependencies": {
          "appmetrics": "^3.0.1",
          "body-parser": "^1.17.2",
          "express": "^4.15.3",
          "log4js": "^1.1.1"
        },
        "devDependencies": {
          "chai": "^4.0.0",
          "mocha": "^3.4.2",
          "nyc": "^10.3.2",
          "proxyquire": "^1.8.0"
        }});
    });
  });

  describe('README.md checks', function () {
    it('contains default project name', function () {
      assert.fileContent(common.file.README_md, '# project-name');
    });

    it('contains Bluemix badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)');
    });
  });

  describe(common.file.server_js, () => {
    it('contains app name', () => {
      assert.fileContent(common.file.server_js, 'logger.info(`project-name listening on http://localhost:${port}`);')
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});

describe('core-node-express:app integration test with custom spec', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../app'))
      .withOptions({spec: { appname: 'testApp', port: common.defaultPort }})
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.file).map((key) => common.file[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.file.local, function () {
    it('contains the custom port', function () {
      assert.jsonFileContent(common.file.local, {port: common.defaultPort});
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "version": "1.0.0",
        "description": "A generated Bluemix application",
        "private": true,
        "engines": {
          "node": "^6.9.0"
        },
        "scripts": {
          "start": "node server/server.js",
          "test": "nyc mocha"
        },
        "dependencies": {
          "appmetrics": "^3.0.1",
          "body-parser": "^1.17.2",
          "express": "^4.15.3",
          "log4js": "^1.1.1"
        },
        "devDependencies": {
          "chai": "^4.0.0",
          "mocha": "^3.4.2",
          "nyc": "^10.3.2",
          "proxyquire": "^1.8.0"
        }});
    });
  });

  describe(common.file.README_md, function () {
    it('contains default project name', function () {
      assert.fileContent(common.file.README_md, '# project-name');
    });

    it('contains Bluemix badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)');
    });
  });

  describe(common.file.server_js, () => {
    it('contains default app name', () => {
      assert.fileContent(common.file.server_js, 'logger.info(`project-name listening on http://localhost:${port}`);')
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});


describe('core-node-express:app integration test with custom bluemix', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../app'))
      .withOptions({bluemix: { name: 'testApp'}})
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.file).map((key) => common.file[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.file.local, function () {
    it('contains the default port', function () {
      assert.jsonFileContent(common.file.local, {port: 3000});
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "version": "1.0.0",
        "description": "A generated Bluemix application",
        "private": true,
        "engines": {
          "node": "^6.9.0"
        },
        "scripts": {
          "start": "node server/server.js",
          "test": "nyc mocha"
        },
        "dependencies": {
          "appmetrics": "^3.0.1",
          "body-parser": "^1.17.2",
          "express": "^4.15.3",
          "log4js": "^1.1.1"
        },
        "devDependencies": {
          "chai": "^4.0.0",
          "mocha": "^3.4.2",
          "nyc": "^10.3.2",
          "proxyquire": "^1.8.0"
        }});
    });
  });

  describe(common.file.README_md, function () {
    it('contains custom project name', function () {
      assert.fileContent(common.file.README_md, '# testApp');
    });

    it('contains Bluemix badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)');
    });
  });

  describe(common.file.server_js, () => {
    it('contains custom app name', () => {
      assert.fileContent(common.file.server_js, 'logger.info(`testApp listening on http://localhost:${port}`);')
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});

describe('core-node-express:app integration test with custom bluemix and spec', function () {
  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../app'))
      .withOptions({bluemix: { name: 'testApp'}, spec: {port: common.defaultPort}})
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    // Files which we assert are created each time the app generator is run.
    // Takes an array of files, converted from obj by Object.values().
    const expected = Object.keys(common.file).map((key) => common.file[key]);

    it('generates the expected application files', function () {
      assert.file(expected);
    });
  });

  describe(common.file.local, function () {
    it('contains the custom port', function () {
      assert.jsonFileContent(common.file.local, {port: common.defaultPort});
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "version": "1.0.0",
        "description": "A generated Bluemix application",
        "private": true,
        "engines": {
          "node": "^6.9.0"
        },
        "scripts": {
          "start": "node server/server.js",
          "test": "nyc mocha"
        },
        "dependencies": {
          "appmetrics": "^3.0.1",
          "body-parser": "^1.17.2",
          "express": "^4.15.3",
          "log4js": "^1.1.1"
        },
        "devDependencies": {
          "chai": "^4.0.0",
          "mocha": "^3.4.2",
          "nyc": "^10.3.2",
          "proxyquire": "^1.8.0"
        }});
    });
  });

  describe(common.file.README_md, function () {
    it('contains custom project name', function () {
      assert.fileContent(common.file.README_md, '# testApp');
    });

    it('contains Bluemix badge', function () {
      assert.fileContent(common.file.README_md,
        '[![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)');
    });
  });

  describe(common.file.server_js, () => {
    it('contains custom app name', () => {
      assert.fileContent(common.file.server_js, 'logger.info(`testApp listening on http://localhost:${port}`);')
    });
  });

  describe(common.file.gitignore, function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules');
    });
  });
});
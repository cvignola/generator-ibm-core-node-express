/**
 * Tests here do not stub out the subgenerators, so for the app generator
 * the real build and refresh subgenerators get called.
 */
'use strict';
const common = require('../common.js')
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const rootPath = path.join( __dirname, '../../');

describe('express:app integration test with applicationType WEB', function () {

  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../app'))
      .withGenerators([require.resolve('../../refresh')])
      .withOptions({spec: {
        appname: 'testApp',
        applicationType: 'WEB',
        autoScaling: true,
        monitoring: true,
        database: true,
        dbName: ['cloudant']
      }})
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

  describe(common.file.server_js, function () {
    it('contains the default port', function () {
      assert.fileContent(common.file.server_js, "const port = 'PORT' in process.env ? process.env.PORT : " + common.defaultPort);
    });

    describe('cloudant code tests', function () {
      it('contains the cloudant require', function () {
        assert.fileContent(common.file.server_js, common.readPartial(rootPath, common.partial.cloudant));
      });
    });

    describe('monitoring code tests', function () {
      it('contains the appmetrics-dash code', function () {
        assert.fileContent(common.file.server_js, common.readPartial(rootPath, common.partial.monitoring));
      });
    });

    describe('autoScaling code tests', function () {
      it('contains the autoScaling code', function () {
        assert.fileContent(common.file.server_js, "require('bluemix-autoscaling-agent');");
      });
    });
  });

  describe(common.file.package_json, function () {
    it('check package.json', function () {
      assert.jsonFileContent(common.file.package_json, {
        "description": "A generated Bluemix application",
        "scripts": {
          "start": common.npmStart
        },
        "dependencies": {
          "appmetrics-dash": "^3.0.0",
          "bluemix-autoscaling-agent": "*",
          "cloudant": "^1.7.1",
          "cfenv": "^1.0.3",
          "express": "^4.14.0"
        }
      });
    });
  });

  describe(common.file.manifest_yml, function () {
    it('OPENAPI_SPEC should not exist', function () {
      assert.noFileContent(common.file.manifest_yml, /OPENAPI_SPEC/);
    });
  });

  describe('README.md checks', function () {
    it('contains Deploy badge', function () {
      assert.fileContent(common.file.README_md, '[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy)');
    });

    it('contains Toolchain badge', function () {
      assert.fileContent(common.file.README_md,
        '[![Create Toolchain](https://console.ng.bluemix.net/devops/' +
        'graphics/create_toolchain_button.png)]' +
        '(https://console.ng.bluemix.net/devops/setup/deploy/)');
    });
  });

  describe('.gitignore checks', function () {
    it('contains node_modules', function () {
      assert.fileContent(common.file.gitignore, 'node_modules/');
    });
  });
});

/**
 * Tests here do not stub out the subgenerators, so for the app generator
 * the real build and refresh subgenerators get called.
 */
'use strict';
const common = require('../common.js')
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const rootPath = path.join(__dirname, '../../');

describe('express:app database test', function() {

  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function() {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join(__dirname, '../../app'))
      .withGenerators([require.resolve('../../refresh')])
      .withPrompts({
        appname: 'newApp',
        applicationType: 'basic',
        port: '12321',
        autoScaling: false,
        monitoring: false,
        database: true,
        dbName: ['cloudant', 'mongoDB', 'cloudant', 'redis', 'objectStorage']
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe(common.file.package_json, function() {
    it('check package.json', function() {
      assert.jsonFileContent(common.file.package_json, {
        "description": "A generated Bluemix application",
        "scripts": {
          "start": common.npmStart
        },
        "dependencies": {
          "bluemix-appid": "*",
          "cloudant": "^1.7.1",
          "bluemix-objectstorage": "*",
          "cfenv": "^1.0.3",
          "express": "^4.14.0"
        }
      });
    });
  });

  describe(common.file.server_js, function() {
    it('contains the chosen port', function() {
      assert.fileContent(common.file.server_js, "const port = 'PORT' in process.env ? process.env.PORT : 8080");
    });

    describe('cloudant code tests', function() {
      it('contains the cloudant require', function() {
        assert.fileContent(common.file.server_js, common.readPartial(rootPath, common.partial.cloudant));
      });
    });

    // describe('mongoDB code tests', function () {
    //   it.('contains the mongoDB require', function () {
    //     assert.fileContent(common.file.server_js,
    //         "const mongodb = require('mongodb').MongoClient" +
    //         "\n    , format = require('util').format;");
    //   });
    //
    //   it('contains the mongoDB partials in ' + common.file.server_js, function () {
    //     assert.fileContent(common.file.server_js, common.readPartial(rootPath, common.partial.mongo));
    //   });
    // });
    //
    // describe('redis code tests', function () {
    //   it('contains the redis require', function () {
    //     assert.fileContent(common.file.server_js, "const redis = require('redis');");
    //   });
    //
    //   it('contains the redis partials in server/server.js', function () {
    //     assert.fileContent(common.file.server_js, common.readPartial(rootPath, common.partial.redis));
    //   });
    // });

    describe('Object-Storage code tests', function() {
      it('contains the Object-Storage require', function() {
        assert.fileContent(common.file.server_js, "const ObjectStorage = require('bluemix-objectstorage').ObjectStorage;");
      });

      it('contains the Object-Storage partials in server/server.js', function() {
        assert.fileContent(common.file.server_js, common.readPartial(rootPath, common.partial.objectStorage));
      });
    });
  });

  // describe(common.file.manifest_yml, function () {
  //   describe('cloudant code tests', function () {
  //     it('contains the cloudant0 require', function () {
  //       assert.fileContent(common.file.manifest_yml, "- newApp-cloudant-0");
  //     });
  //     it('contains the cloudant2 require', function () {
  //       assert.fileContent(common.file.manifest_yml, "- newApp-cloudant-2");
  //     });
  //
  //     it('contains the cloudant0 declared-service', function () {
  //       assert.fileContent(common.file.manifest_yml,
  //           "newApp-cloudant-0:" +
  //           "\n      label: cloudantNoSQLDB" +
  //           "\n      plan: Lite");
  //     });
  //
  //     it('contains the cloudant2 declared-service', function () {
  //       assert.fileContent(common.file.manifest_yml,
  //           "newApp-cloudant-2:" +
  //           "\n      label: cloudantNoSQLDB" +
  //           "\n      plan: Lite");
  //     });
  //   });
  //
  //   describe('mongoDB code tests', function () {
  //     it('contains the mongoDB require', function () {
  //       assert.fileContent(common.file.manifest_yml, "- newApp-mongodb-1");
  //     });
  //
  //     it('contains the mongoDB declared-service', function () {
  //       assert.fileContent(common.file.manifest_yml,
  //           "newApp-mongodb-1:" +
  //           "\n      label: compose-for-mongodb" +
  //           "\n      plan: Standard");
  //     });
  //   });
  //
  //   describe('redis code tests', function () {
  //     it('contains the redis require', function () {
  //       assert.fileContent(common.file.manifest_yml, "- newApp-redis-3");
  //     });
  //
  //     it('contains the redis declared-service', function () {
  //       assert.fileContent(common.file.manifest_yml,
  //           "newApp-redis-3:" +
  //           "\n      label: compose-for-redis" +
  //           "\n      plan: Standard");
  //     });
  //   });
  //
  //   describe('Object-Storage code tests', function () {
  //     it('contains the Object-Storage require', function () {
  //       assert.fileContent(common.file.manifest_yml, "- newApp-objectStorage-4");
  //     });
  //
  //     it('contains the Object-Storage declared-service', function () {
  //       assert.fileContent(common.file.manifest_yml,
  //           "newApp-objectStorage-4:" +
  //           "\n      label: Object-Storage" +
  //           "\n      plan: Free");
  //     });
  //   });
  // });

  // describe(common.file.pipeline_yml, function () {
  //   it('contains the cf create cloudant0 command', function () {
  //     assert.fileContent(common.file.pipeline_yml,
  //         "cf create-service cloudantNoSQLDB Lite newApp-cloudant-0");
  //   });
  //
  //   it('contains the cf create cloudant2 command', function () {
  //     assert.fileContent(common.file.pipeline_yml,
  //         "cf create-service cloudantNoSQLDB Lite newApp-cloudant-2");
  //   });
  //
  //   it('contains the cf create mongoDB command', function () {
  //     assert.fileContent(common.file.pipeline_yml,
  //         "cf create-service compose-for-mongodb Standard newApp-mongodb-1" +
  //         "\n      sleep 30");
  //   });
  //
  //   it('contains the cf create redis command', function () {
  //     assert.fileContent(common.file.pipeline_yml,
  //         "cf create-service compose-for-redis Standard newApp-redis-3" +
  //         "\n      sleep 30");
  //   });
  //
  //   it('contains the cf create Object-Storage command', function () {
  //     assert.fileContent(common.file.pipeline_yml,
  //         "cf create-service Object-Storage Free newApp-objectStorage-4" +
  //         "\n      sleep 30");
  //   });
  // });

});

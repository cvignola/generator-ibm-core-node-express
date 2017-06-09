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

describe.skip('express:app no prompts test', function () {

  // Express build is slow so we need to set a longer timeout for the test
  this.timeout(150000);

  before(function () {
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../app'))
    .withGenerators([require.resolve('../../refresh')])
    .withPrompts({
      appname: 'newApp',
      autoScaling: false,
      monitoring: false,
      database: false
    })
    .toPromise(); // Get a Promise back when the generator finishes
  });

  describe(common.file.server_js, function () {
    it('does not contain the cloudant code', function () {
      assert.noFileContent(common.file.server_js, common.readPartial(rootPath, common.partial.cloudant));
    });

    it('does not contain the redis code', function () {
      assert.noFileContent(common.file.server_js, common.readPartial(rootPath, common.partial.redis));
    });

    it('does not contain the mongoDB code', function () {
      assert.noFileContent(common.file.server_js, common.readPartial(rootPath, common.partial.mongo));
    });

    it('does not contain the Object-Storage code', function () {
      assert.noFileContent(common.file.server_js, common.readPartial(rootPath, common.partial.objectStorage));
    });
  });

  // describe(common.file.manifest_yml, function () {
  //   describe('cloudant code tests', function () {
  //     it('does not contain the cloudant require', function () {
  //       assert.noFileContent(common.file.manifest_yml, "- newApp-cloudant-0");
  //     });
  //
  //     it('does not contain the cloudant declared-service', function () {
  //       assert.noFileContent(common.file.manifest_yml,
  //           "newApp-cloudant-0:" +
  //           "\n      label: cloudantNoSQLDB" +
  //           "\n      plan: Lite");
  //     });
  //   });
  //
  //   describe('mongoDB code tests', function () {
  //     it('does not contain the mongoDB require', function () {
  //       assert.noFileContent(common.file.manifest_yml, "- newApp-mongodb-1");
  //     });
  //
  //     it('does not contain the mongoDB declared-service', function () {
  //       assert.noFileContent(common.file.manifest_yml,
  //           "newApp-mongodb-1:" +
  //           "\n      label: compose-for-mongodb" +
  //           "\n      plan: Standard");
  //     });
  //   });
  //
  //   describe('redis code tests', function () {
  //     it('does not contain the redis require', function () {
  //       assert.noFileContent(common.file.manifest_yml, "- newApp-redis-3");
  //     });
  //
  //     it('does not contain the redis declared-service', function () {
  //       assert.noFileContent(common.file.manifest_yml,
  //           "newApp-redis-3:" +
  //           "\n      label: compose-for-redis" +
  //           "\n      plan: Standard");
  //     });
  //   });
  //
  //   describe('Object-Storage code tests', function () {
  //     it('does not contain the Object-Storage require', function () {
  //       assert.noFileContent(common.file.manifest_yml, "- newApp-objectStorage-4");
  //     });
  //
  //     it('does not contain the Object-Storage declared-service', function () {
  //       assert.noFileContent(common.file.manifest_yml,
  //           "newApp-objectStorage-4:" +
  //           "\n      label: Object-Storage" +
  //           "\n      plan: Free");
  //     });
  //   });
  // });

  // describe(common.file.pipeline_yml, function () {
  //   it('does not contain the cf create cloudant command', function () {
  //     assert.noFileContent(common.file.pipeline_yml,
  //         "cf create-service cloudantNoSQLDB Lite newApp-cloudant-0");
  //   });
  //
  //   it('does not contain the cf create mongoDB command', function () {
  //     assert.noFileContent(common.file.pipeline_yml,
  //         "cf create-service compose-for-mongodb Standard newApp-mongodb-1" +
  //         "\n      sleep 30");
  //   });
  //
  //   it('does not contain the cf create redis command', function () {
  //     assert.noFileContent(common.file.pipeline_yml,
  //         "cf create-service compose-for-redis Standard newApp-redis-3" +
  //         "\n      sleep 30");
  //   });
  //
  //   it('does not contain the cf create Object-Storage command', function () {
  //     assert.noFileContent(common.file.pipeline_yml,
  //         "cf create-service Object-Storage Free newApp-objectStorage-4" +
  //         "\n      sleep 30");
  //   });
  // });

  describe(common.file.package_json, function () {
    it('does not contain cloudant module', function () {
      assert.jsonFileContent(common.file.package_json, {"cloudant":undefined});
    });

    it('does not contain redis module', function () {
      assert.jsonFileContent(common.file.package_json, {"redis":undefined});
    });

    it('does not contain mongoDB module', function () {
      assert.jsonFileContent(common.file.package_json, {"mongodb":undefined});
    });

    it('does not contain Object-Storage module', function () {
      assert.jsonFileContent(common.file.package_json, {"pkgcloud":undefined});
    });

    it('does not contain the appmetrics-dash module', function () {
      assert.jsonFileContent(common.file.package_json, {"appmetrics-dash":undefined});
    });

    it('does not contain autoScaling module', function () {
      assert.jsonFileContent(common.file.package_json, {"bluemix-autoscaling-agent":undefined});
    });
  });
});

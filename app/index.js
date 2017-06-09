'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const thisPackage = require("./../package.json")
const OPTION_BLUEMIX = "bluemix";
const OPTION_SPEC = "spec";

module.exports = class extends Generator {
  // eslint-disable-next-line no-useless-constructor
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // bluemix option for YaaS integration
    this.argument(OPTION_BLUEMIX, {
      desc: 'Option for deploying with Bluemix. Stringified JSON.',
      required: false,
      hide: true,
      type: String
    });

    // spec as json
    this.argument(OPTION_SPEC, {
      desc: 'The generator specification. Stringified JSON.',
      required: false,
      hide: true,
      type: String
    });

    console.log("Package info ::", thisPackage.name, thisPackage.version)
  }

  initializing() {
    this.skipPrompt = true;

    if (this.options.spec) {
      // If "spec" was sent by scaffolder - parse it
      console.log("Parsing 'spec' received from Scaffolder");
      try {
        this.options.spec = typeof(this.options.spec) === 'string' ?
          JSON.parse(this.options.spec) : this.options.spec;
      } catch (err) {
        console.error(chalk.red(err));
      }
    } else {
      // If "spec" was NOT sent by scaffolder, but --specfile parameter was used
      // get the spec from default_spec.js file. This is useful for development
      // in order not to answer bunch of questions every time
      console.log("Reading default_spec.js");
      this.options.spec = JSON.parse(require("./default_spec.js"));
    }

    if (this.options.bluemix) {
      // If "bluemix" was sent by scaffolder - parse it
      console.log("Parsing 'bluemix' received from Scaffolder");
      try {
        this.options.bluemix = typeof(this.options.bluemix) === 'string' ?
          JSON.parse(this.options.bluemix) : this.options.bluemix;
      } catch (err) {
        console.error(chalk.red(err));
      }
    } else {
      // If "bluemix" was NOT sent by scaffolder - fallback to default_bluemix.js
      // This is useful for development to test the integration with Scaffolder
      console.log("Reading default_bluemix.json");
      this.options.bluemix = JSON.parse(require("./default_bluemix.js"));
    }

    if (this.options.bluemix) {
      const projectConfig = this.options.bluemix;
      projectConfig.hasCloudant = typeof(projectConfig.cloudant) === "object";
      projectConfig.hasObjectStorage = typeof(projectConfig.objectStorage) === "object";
      projectConfig.hasAppId = typeof(projectConfig.appid) === "object";
      projectConfig.hasServer = typeof(projectConfig.server) === "object";
      this.options.bluemix = projectConfig;
    }

  }

  prompting() {
    if (this.skipPrompt) return;

    return this.prompt([{
      type: 'input',
      name: 'appname',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      type: 'list',
      name: 'applicationType',
      choices: [{
        name: 'basic',
        value: 'basic'
      }, {
        name: 'BFF',
        value: 'BFF'
      }, {
        name: 'WEB',
        value: 'WEB'
      }],
      message: 'Which project type?',
      default: 'basic'
    }, {
      type: 'number',
      name: 'port',
      message: 'Which port would you like to use?',
      default: 8080 // Update test/common.js defaultPort if you change this
    }, {
      type: 'list',
      name: 'autoScaling',
      message: 'Would you to add AutoScaling? (y/n)',
      choices: [{
        name: 'yes',
        value: true
      }, {
        name: 'no',
        value: false
      }]
    }, {
      type: 'list',
      name: 'monitoring',
      message: 'Would you to add monitoring? (y/n)',
      choices: [{
        name: 'yes',
        value: true
      }, {
        name: 'no',
        value: false
      }]
    }, {
      type: 'list',
      name: 'database',
      message: 'Would you like a database? (y/n)',
      default: false,
      choices: [{
        name: 'yes',
        value: true
      }, {
        name: 'no',
        value: false
      }]
    }, {
      when: function(answers) {
        return (/true/i).test(answers.database);
      },
      name: 'dbName',
      message: 'Please select a database type',
      type: 'list',
      choices: ['mongoDB', 'redis', 'cloudant', 'objectStorage'],
      filter: choices => choices.split(',')
    }, {
      type: 'list',
      name: 'authentication',
      message: 'Whould you like to add authentication? (y/n)',
      choices: [{
        name: 'yes',
        value: true
      },
      {
        name: 'no',
        value: false
      }]
    }]).then(answers => {
      this.options.spec = answers;
      if (answers.dbName) {
        answers.dbName.forEach(name => this.options.spec[name] = {})
      }
    });
  }
  install() {
    this.composeWith(require.resolve('../refresh/index.js'), {
      spec: this.options.spec,
      bluemix: this.options.bluemix
    });
  }
};

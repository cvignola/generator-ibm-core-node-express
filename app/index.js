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

    this._sanitizeOption(this.options, OPTION_BLUEMIX);
    this._sanitizeOption(this.options, OPTION_SPEC);
  }

  /**
   * Copy a template file or directory to a location with options
   *
   * @param {string} from Template file
   * @param {string=} to Destination file, defaults to same as from
   * @param {any=} options Copy options
   * @param {boolean=} options Whether the input is a file or directory
   */
  _copy(from, to, options = {}, directory = false) {
    if (typeof to === 'undefined') {
      to = from;
    }

    if (directory === true) {
      this.fs.copy(this.templatePath(from), this.destinationPath(to), options);
    } else {
      this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), options);
    }
  }

  writing() {
    const options = this.options;

    this._copy('public', 'public', {}, true);
    this._copy('test', 'test', {}, true);
    this._copy('server/config', 'server/config', {}, true);
    this._copy('server/routers', 'server/routers', {}, true);
    this._copy('server/services', 'server/services', {}, true);
    this._copy('server/server.js', 'server/server.js', options);
    this._copy('package.json', 'package.json', options);
    this._copy('README.md', 'README.md', options);
  }

  _sanitizeOption(options, name) {
    var optionValue = options[name];
      if (!optionValue) {
       this.log("Did not receive", name, "parameter from Scaffolder. Falling back to fallback_" + name + ".js");
			this.options[name] = JSON.parse(require("./fallback_" + name));
			return;
		}

		if (optionValue.indexOf("file:") === 0){
			var fileName = optionValue.replace("file:","");
			var filePath = this.destinationPath("./" + fileName);
			console.log("Reading", name, "parameter from local file", filePath);
			this.options[name] = this.fs.readJSON(filePath);
			return;
		}

		try {
			this.options[name] = typeof(this.options[name]) === "string" ?
				JSON.parse(this.options[name]) : this.options[name];
		} catch (err) {
			console.error(chalk.red(err));
			throw name + " parameter is expected to be a valid stringified JSON object";
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
};

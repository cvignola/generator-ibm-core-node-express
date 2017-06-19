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
    if (!to) {
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

    this._copy('public', null, {}, true);
    this._copy('test', null, {}, true);
    this._copy('server/config/local.json', null, options);
    this._copy('server/routers', null, {}, true);
    this._copy('server/services', null, {}, true);
    this._copy('server/server.js', null, options);
    this._copy('package.json', null, options);
    this._copy('README.md', null, options);
    this._copy('_gitignore', '.gitignore', options);
  }

	_sanitizeOption(options, name) {
		var optionValue = options[name];
		if (!optionValue) {
			console.info("Did not receive", name, "parameter from Scaffolder. Falling back to fallback_" + name + ".js");
			this.options[name] = JSON.parse(require("./fallback_" + name));
			return
		}

		if (optionValue.indexOf("file:") === 0){
			var fileName = optionValue.replace("file:","");
			var filePath = this.destinationPath("./" + fileName);
			console.info("Reading", name, "parameter from local file", filePath);
			this.options[name] = this.fs.readJSON(filePath);
			return;
		}

		try {
			this.options[name] = typeof(this.options[name]) === "string" ?
				JSON.parse(this.options[name]) : this.options[name];
		} catch (e) {
			console.error(e);
			throw name + " parameter is expected to be a valid stringified JSON object";
		}
	}
};

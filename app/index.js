'use strict';
const Generator = require('yeoman-generator');
const Bundle = require("./../package.json")
const Log4js = require('log4js');
const logger = Log4js.getLogger("generator-core-node-express");

const OPTION_BLUEMIX = "bluemix";
const OPTION_SPEC = "spec";

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    logger.info("Package info ::", Bundle.name, Bundle.version);

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
  }


  initializing() {
    this.skipPrompt = true;
    this._sanitizeOption(this.options, OPTION_BLUEMIX);
    this._sanitizeOption(this.options, OPTION_SPEC);
  }

  writing() {
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), this.options);
    this.fs.move(this.destinationPath('_gitignore'), this.destinationPath('.gitignore'));
  }

  _sanitizeOption(options, name) {
    let optionValue = options[name];
    if (!optionValue) {
      return logger.error("Missing", name, "parameter");
    }

    if (optionValue.indexOf("file:") === 0) {
      let fileName = optionValue.replace("file:", "");
      let filePath = this.destinationPath("./" + fileName);
      logger.info("Reading", name, "parameter from local file", filePath);
      this.options[name] = this.fs.readJSON(filePath);
      return;
    }

    try {
      this.options[name] = typeof(this.options[name]) === "string" ?
        JSON.parse(this.options[name]) : this.options[name];
    } catch (e) {
      logger.error(e);
      throw name + " parameter is expected to be a valid stringified JSON object";
    }
  }
};

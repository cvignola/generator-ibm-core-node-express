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
    this.fs.copyTpl(this.templatePath('server'), this.destinationPath('server'), this.options);
    this.fs.copyTpl(this.templatePath('test'), this.destinationPath('test'), this.options);
    this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'), this.options);
    this.fs.copyTpl(this.templatePath('cli-config.yml'), this.destinationPath('cli-config.yml'), this.options);
    this.fs.copyTpl(this.templatePath('Dockerfile'), this.destinationPath('Dockerfile'), this.options);
    this.fs.copyTpl(this.templatePath('Dockerfile-tools'), this.destinationPath('Dockerfile-tools'), this.options);
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
    this.fs.copyTpl(this.templatePath('package-lock.json'), this.destinationPath('package-lock.json'), this.options);
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.options);

    if(this.options.spec && this.options.spec.applicationType === 'BFF') {
      this.fs.copy(this.templatePath('public/swagger-ui'), this.destinationPath('public/swagger-ui'));
      this.fs.copyTpl(this.templatePath('public/swagger.yaml'), this.destinationPath('public/swagger.yaml'), this.options);
    } else {
      this.fs.copy(this.templatePath('public/index.html'), this.destinationPath('public/index.html'));
    }
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

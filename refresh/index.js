'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.spec = opts.spec;
    this.bluemix = opts.bluemix;
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
    const options = {
      spec: this.spec,
      bluemix: this.bluemix
    };

    this._copy('public', 'public', {}, true);
    this._copy('test', 'test', {}, true);
    this._copy('server/config', 'server/config', {}, true);
    this._copy('server/routers', 'server/routers', {}, true);
    this._copy('server/services', 'server/services', {}, true);
    this._copy('server/server.js', 'server/server.js', options);
    this._copy('package.json', 'package.json', options);
    this._copy('README.md', 'README.md', options);
  }

  end() {
    // this.installDependencies({
    //   npm: true,
    //   bower: false,
    //   callback: function() {
    //     console.log('Everything is ready!');
    //   }
    // });
  }
};

'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'compodoc'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        },
        this.options.testmode ? {local: require.resolve('generator-jhipster/generators/modules')} : null
      );
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the JHipster compodoc generator! ' + chalk.blue('v' + packagejs.version + '\n'));
    }
  },

  writing: {
    writeTemplates : function () {
      jhipsterFunc.addNpmDevDependency('compodoc', '0.0.26');
      jhipsterFunc.addNpmScript('doc', './node_modules/.bin/compodoc -p src/tsconfig.json');
    },

    registering: function () {
      try {
        jhipsterFunc.registerModule("generator-jhipster-compodoc", "entity", "post", "app", "JHipster module, additional compodoc support in your JHipster application");
      } catch (err) {
        this.log(chalk.red.bold('WARN!') + ' Could not register as a jhipster entity post creation hook...\n');
      }
    }
  },

  install: function () {
    this.npmInstall();
  },

  end: function () {
    this.log('End of JHipster compodoc generator');
    this.log(' Run compodoc using npm scripts :');
    this.log(' > npm run doc');
  }
});

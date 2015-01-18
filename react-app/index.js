'use strict';
var yeoman = require('yeoman-generator');
var path   = require('path');

module.exports = yeoman.generators.Base.extend({
  //initializing: function () {},

  installingDeps: function() {
    this.npmInstall(['react'], { 'saveDev': true });
    this.npmInstall(['react-router'], { 'saveDev': true });
  },

  writing: function () {
    this.templatePath = function(filename) {
      return path.join(this.sourceRoot(), filename);
    }
    this.destinationPath = function(filename) {
      return path.join(this.destinationRoot(), filename);
    }

    this.copy(
      this.templatePath('_app.jsx'),
      this.destinationPath('scripts/app.jsx')
    );

    this.copy(
      this.templatePath('_routes/_app.jsx'),
      this.destinationPath('scripts/routes/app.jsx')
    );
  }
});

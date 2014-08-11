'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var CrankGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (this.options.install) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Crank generator!'));

    var prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What\'s the name of your component?'
      },
      {
        type: 'input',
        name: 'componentDescription',
        message: 'Tell me a litte bit about it.'
      }
    ];

    this.prompt(prompts, function (props) {
      this.componentName = props.componentName;
      this.componentDescription = props.componentDescription;
      done();
    }.bind(this));
  },

  app: function () {
    console.log('Whipping up your ' + this.name + ' component…');

  },

  projectfiles: function () {
    var context = {
      component_folder_name: this._.slugify(this.componentName),
      component_name: this._.classify(this.componentName),
      component_description: this.componentDescription
    };

    var compDir = 'client/styles/' + this._.slugify(this.componentName) + '/';
    this.template('_package.json', compDir + 'package.json', context);
    this.template('_index.css', compDir + 'index.css', context);
    this.template('_component.css', compDir + 'lib/' + context.component_folder_name + '.css', context);
  }
});

module.exports = CrankGenerator;

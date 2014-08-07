'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ComponentGenerator = yeoman.generators.NamedBase.extend({
  promptForConfiguration: function() {

    var done = this.async();

    var prompts = [{
      name: 'componentDescription',
      message: 'Tell me a litte bit about it.'
    }];

    this.prompt(prompts, function processAnswers(answers) {

      this.componentName = this.name;
      this.componentDescription = answers.componentDescription;

      done();
    }.bind(this));
  },

  init: function () {
    console.log('You called the component subgenerator with the argument ' + this.name + '.');
  },

  files: function () {
    var context = {
      component_name: this._.classify(this.componentName),
      component_description: this.componentDescription
    };

    var compDir = 'app/styles/' + this._.slugify(this.componentName) + '/';

    this.template('_package.json', compDir + 'package.json', context);
    this.template('_index.css', compDir + 'index.css', context);
  }
});

module.exports = ComponentGenerator;

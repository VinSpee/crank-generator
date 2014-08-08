'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ComponentGenerator = yeoman.generators.Base.extend({
  promptForConfiguration: function() {

    var done = this.async();

    var prompts = [{
      name: 'componentDescription',
      message: 'Tell me a litte bit about it.'
    }];

    console.log('pre-prompt');
    this.prompt(prompts, function processAnswers(answers) {
      console.log('prompting');
      console.log(prompts);

      this.componentName = this.name;
      this.componentDescription = answers.componentDescription;

      done();
    }.bind(this));
  },

  init: function () {
    console.log('Whipping up your ' + this.name + ' component…');
  },

  files: function () {
    var context = {
      component_folder_name: this._.slugify(this.componentName),
      component_name: this._.classify(this.componentName),
      component_description: this.componentDescription
    };


    var compDir = 'app/styles/' + this._.slugify(this.componentName) + '/';

    this.template('_package.json', compDir + 'package.json', context);
    this.template('_index.css', compDir + 'index.css', context);
    this.template('_component.css', compDir + context.component_folder_name + '.css', context);
  }
});

module.exports = ComponentGenerator;

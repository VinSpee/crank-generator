'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  //initializing: function () {},

  prompting: {
    promptUser: function() {
      var done = this.async();
      var questions = [];

      questions.push({
        type: 'input',
        name: 'name',
        message: 'What\'s this component\'s name?',
      });

      questions.push({
        type: 'confirm',
        name: 'needsStore',
        message: 'Does it need a data store?',
        default: false
      });

      this.prompt(questions, function(answers){
        this.name        = answers.name;
        this.needsStore  = answers.needsStore;
        done();
      }.bind(this));

    }
  },

  writing: {

    configTemplates: function() {
      this.context = {
        component_folder_name: this._.slugify(this.name),
        component_name: this._.classify(this.name),
        component_needs_store: this.needsStore
      };
      this.context.component_dir = 'scripts/' + this.context.component_folder_name + '/'
    },

    paths: function() {
      var done = this.async();
      this.templatePath = function(filename) {
        return path.join(this.sourceRoot(), filename);
      }
      this.destinationPath = function(filename) {
        return path.join(this.destinationRoot(), filename);
      }

      this.template(this.templatePath('_component.jsx'), this.destinationPath(this.context.component_dir + this.context.component_folder_name + '.jsx'), this.context);

      if(this.needsStore) {
        this.template(this.templatePath('_component-store.js'), this.destinationPath(this.context.component_dir + 'store/' + this.context.component_folder_name + '.js'), this.context);
        this.template(this.templatePath('_mock.json'), this.destinationPath(this.context.component_dir + 'store/mock.json'), this.context);
      }
      done();
    }
  }
});


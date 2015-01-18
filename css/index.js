'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  //initializing: function () {},

  prompting: {
    promptUser: function() {
      var done = this.async();
      var questions = [];

      if(!this.config.get('css_methodology')) {
        questions.push({
          type         : 'list',
          name         : 'css_methodology',
          message      : 'Which methodology are you using for this project?',
          choices      : [
            'SUITCSS',
            'AMCSS'
          ],
          default      : 'SUITCSS',
          filter       : function(val) { return val.toLowerCase(); }
        });
      }
      questions.push({
        type: 'input',
        name: 'componentName',
        message: 'What\'s this component\'s name?',
      });
      questions.push({
        type: 'input',
        name: 'componentDescription',
        message: 'What does it do?',
      });

      this.prompt(questions, function(answers){
        this.css_methodology      = answers.css_methodology || this.config.get('css_methodology');
        this.componentName        = answers.componentName;
        this.componentDescription = answers.componentDescription;
        this.config.set('css_methodology', this.css_methodology);
        done();
      }.bind(this));

    }
  },

  writing: {

    configTemplates: function() {
      this.context = {
        component_folder_name: this._.slugify(this.componentName),
        component_name: this._.classify(this.componentName),
        component_description: this.componentDescription,
      };
      this.context.component_dir = 'styles/' + this.context.component_folder_name + '/'
    },

    paths: function() {
      this.templatePath = function(filename) {
        return path.join(this.sourceRoot(), filename);
      }
      this.destinationPath = function(filename) {
        return path.join(this.destinationRoot(), filename);
      }

      this.template(this.templatePath('_package.json'), this.destinationPath(this.context.component_dir + 'package.json'), this.context);
      this.template(this.templatePath('_index.css'), this.destinationPath(this.context.component_dir + 'index.css'), this.context);

      if(this.css_methodology === 'suitcss') {
        this.template(this.templatePath('_suit-component.css'), this.destinationPath(this.context.component_dir + 'lib/' + this.context.component_folder_name + '.css'), this.context);
      } else if(this.css_methodology === 'amcss') {
        this.template(this.templatePath('_am-component.css'), this.destinationPath(this.context.component_dir + 'lib/' + this.context.component_folder_name + '.css'), this.context);
      } else {
        this.log('something went wrong with your CSS methodology');
      }
    }
  }
});

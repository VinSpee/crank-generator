'use strict';
var util   = require('util');
var path   = require('path');
var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.config.save();
  },

  promptUser: function() {
    var done = this.async();

    // Greet the user.
    this.log(yosay(
      chalk.green('Crank') + ' it up!'
    ));

    var prompts = [{
      type: 'list',
      name: 'componentCategory',
      message: 'Which part of the component are you building?',
      choices: [
        //'Javascript',
        'CSS',
        //'HTML'
      ],
      filter: function(val) { return val.toLowerCase(); }
    }];

    this.prompt(prompts, function(props) {
      this.category = props.componentCategory;
      done();
    }.bind(this));
  },

  callSubgenerator: function() {
    if(this.category) {
      var done = this.async();
      this.invoke('crank:' + this.category, {}, function() {
        done();
      })
    } else {
      this.log('Bye!');
    }
  }
});

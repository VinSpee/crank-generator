var React          = require('react');
var {RouteHandler} = require('react-router');

var App = React.createClass({

  render() {
    return(
      <RouteHandler params={this.props.params}/>
    );
  }

});

module.exports = App;


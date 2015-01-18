var React                         = require('react');
var {Router, Route, DefaultRoute} = require('react-router');

var routes = (
  <Route handler={require('./routes/app.jsx')} path="/">
  </Route>
);

Router.run(routes, function (Handler, state) {
  React.render(<Handler params={state.params}/>, document.body);
});

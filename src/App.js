import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Adopt from './components/Adopt';
import Learn from './components/Learn';
import Help from './components/Help';
import PetDetails from './components/PetDetails';
import Home from './components/Home';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/adopt" exact component={Adopt} />
      <Route path="/learn" component={Learn} />
      <Route path="/help" component={Help} />
      <Route path="/pet/:id" component={PetDetails} />
    </Switch>
  </Router>
);

export default App;

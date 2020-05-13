import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { withStoreContext } from './store';
import logger from './middlewares/logger'
import PokeGreeting from "./components/poke-greeting.component";
import PokeDetails from "./components/poke-details.component";

function App() {
  return (
    <Router>
      <Route path="/" exact component={PokeGreeting} />
      <Route path="/details/:id" component={PokeDetails} />
    </Router>
  );
}

export default withStoreContext(App, [logger]);

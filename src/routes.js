import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Initial from './pages/Initial';
import Details from './pages/Details';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Initial} />
        <Route exact path='/:pokemonName/details' component={Details} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

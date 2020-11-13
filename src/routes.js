import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Initial from './Initial';

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exatc path="/" component={Initial}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
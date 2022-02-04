import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Fallback from './Fallback';

const Routes = () => {
	return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <Fallback />
        </Route>
      </Switch>
    </>
	);
};

export default Routes;

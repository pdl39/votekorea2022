import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { authenticate } from './store/kakaoAuth';
import KakaoLogin from './components/KakaoLogin/KakaoLogin';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import Result from './components/Result/Result';
import Fallback from './Fallback';
import './Routes.css';

const Routes = () => {
  const dispatch = useDispatch();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// AUTHENTICATE USER on component mount
	useEffect(async () => {
    const result = await dispatch(authenticate());
		console.log('authentication dispatch was run');
		if (result && result.user.id) {
      setIsLoggedIn(true);
		}
	}, []);

  console.log(isLoggedIn);

	return (
    <div className="routes-container">
      {
        !isLoggedIn
        ? <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/kakaologin">
            <KakaoLogin isOpen={true} />
          </Route>
          <Route exact path="/serviceagreement">
            <Home />
          </Route>
          <Route exact path="/posts/:id">
            <Post />
          </Route>
          <Route path="/results/:id">
            <Redirect to="/" />
          </Route>
          <Route>
            <Fallback />
          </Route>
        </Switch>
        : <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/kakaologin">
            <Redirect to="/" />
          </Route>
          <Route exact path="/posts/:id">
            <Post />
          </Route>
          <Route exact path="/results/:id">
            <Result />
          </Route>
          <Route>
            <Fallback />
          </Route>
        </Switch>
      }
    </div>
	);
};

export default Routes;

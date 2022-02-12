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
    setIsLoggedIn(result && !!result.user?.id);
		console.log('authentication dispatch was run');
	}, []);

	return (
    <div className="routes-container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/kakaologin">
          <KakaoLogin />
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
    </div>
	);
};

export default Routes;

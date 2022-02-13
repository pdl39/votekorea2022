import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import kakaoAuth from './kakaoAuth';
import post from './post';
import item from './item';
import items from './items';
import choice from './choice';
import choices from './choices';
import resultData from './resultData';

// const reducer = combineReducers({ auth })
const reducer = combineReducers({
	kakaoAuth,
	post,
	item,
	items,
	choice,
	choices,
	resultData
});

const middlewares = [
	thunkMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
	middlewares.push(createLogger({ collapsed: true }));
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

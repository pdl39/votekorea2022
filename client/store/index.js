import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import kakaoAuth from './kakaoAuth';
import post from './post';
import items from './items';

// const reducer = combineReducers({ auth })
const reducer = combineReducers({
	kakaoAuth,
	post,
	items,
});

const middlewares = [
	thunkMiddleware,
];

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(createLogger({ collapsed: true }));
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

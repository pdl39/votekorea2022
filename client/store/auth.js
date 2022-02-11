import axios from 'axios';

// LocalStorage Items
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const EXPIRES_IN = 'expiresIn';
const REFRESH_TOKEN_EXPIRES_IN = 'refreshTokenExpiresIn';

// Action Types
const SET_AUTH = 'SET_AUTH';

// Action Creators
const _setAuth = auth => {
	return {
		type: SET_AUTH,
		auth,
	};
};

// Thunks
export const login = () => { // every kakao api call is done server side (1. get auth code, 2. get access token, 3. register user)
	return async dispatch => {
		try {
			const { data: { kakaoTokens, user } } = await axios.post(`/kakaoauth/login`);
			const parsedKakaoTokens = JSON.parse(kakaoTokens);
			console.log('KAKAOTOKENS: ', parsedKakaoTokens);
			console.log('USER: ', user);

			window.localStorage.setItem(ACCESS_TOKEN, parsedKakaoTokens.access_token);
			window.localStorage.setItem(REFRESH_TOKEN, parsedKakaoTokens.refresh_token);
			window.localStorage.setItem(EXPIRES_IN, parsedKakaoTokens.expires_in);
			window.localStorage.setItem(REFRESH_TOKEN_EXPIRES_IN, parsedKakaoTokens.refresh_token_expires_in);

			const auth = {
				accessToken: window.localStorage.getItem(ACCESS_TOKEN),
				refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
				expiresIn: window.localStorage.getItem(EXPIRES_IN),
				refreshTokenExpiresIn: window.localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN),
				user: user
			};

			dispatch(_setAuth(auth));
			return auth;
		}
		catch (err) {
			window.localStorage.removeItem('authCode');
			dispatch(_setAuth({ err }));
			return { err };
		}
	};
};

export const authenticate = () => {
	return async dispatch => {
		try {
			const { data: { kakaoTokens, user } } = await axios.post(`/kakaoauth/authenticate`, {
				accessToken: window.localStorage.getItem(ACCESS_TOKEN),
				refreshToken: window.localStorage.getItem(REFRESH_TOKEN)
			});

			/* 2 different cases
				1) Default case: Existing access token was still valid.
					- API call response:
						- kakaoTokens = {}
						- user = user object
				2) Refreshed case: Existing accesss token was expired and refresh token was used to get new tokens.
					- API call response:
						- kakaoTokens = new kakaoTokens object
						- user = user object
						- NOTE: refresh_token & refresh_token_expires_in may not be received (these are only returned when existing refresh_token expiration was < 1 month)
			*/

			// Update local storage only if new tokens were received:
			kakaoTokens.access_token &&
			window.localStorage.setItem(ACCESS_TOKEN, kakaoTokens.access_token);
			kakaoTokens.refresh_token &&
			window.localStorage.setItem(REFRESH_TOKEN, kakaoTokens.refresh_token);
			kakaoTokens.expires_in &&
			window.localStorage.setItem(EXPIRES_IN, kakaoTokens.expires_in);
			kakaoTokens.refresh_token_expires_in &&
			window.localStorage.setItem(REFRESH_TOKEN_EXPIRES_IN, kakaoTokens.refresh_token_expires_in);

			const kakaoAuth = {
				accessToken: window.localStorage.getItem(ACCESS_TOKEN),
				refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
				expiresIn: window.localStorage.getItem(EXPIRES_IN),
				refreshTokenExpiresIn: window.localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN),
				user: user
			};

			dispatch(_setAuth(kakaoAuth));
			return kakaoAuth;
		}
		catch (err) {
			console.log({err});
			dispatch(_setAuth({}));
		}
	};
};

export const logout = () => {
	window.localStorage.removeItem(ACCESS_TOKEN);
	window.localStorage.removeItem(REFRESH_TOKEN);
	window.localStorage.removeItem(EXPIRES_IN);
	window.localStorage.removeItem(REFRESH_TOKEN_EXPIRES_IN);

	return {
		type: SET_AUTH,
		kakaoAuth: {}
	};
};

// auth Reducer
const initialState = {
	accessToken: window.localStorage.getItem(ACCESS_TOKEN),
	refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
	expiresIn: window.localStorage.getItem(EXPIRES_IN),
	refreshTokenExpiresIn: window.localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN)
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTH:
			return action.auth;
		default:
			return state;
	}
};

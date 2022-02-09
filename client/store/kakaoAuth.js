import axios from 'axios';

// Action Types
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const EXPIRES_IN = 'expiresIn';
const REFRESH_TOKEN_EXPIRES_IN = 'refreshTokenExpiresIn';
const SET_KAKAO_TOKEN = 'SET_KAKAO_TOKEN';

// Action Creators
const setKakaoToken = kakaoAuth => {
	return {
		type: SET_KAKAO_TOKEN,
		kakaoAuth,
	};
};

// Thunks
export const getKakaoToken = authCode => {
	return async dispatch => {
		try {
			const { data: { kakaoTokens, user } } = await axios.post(`kakaoauth/login`, {
				code: authCode
			});
			const parsedKakaoTokens = JSON.parse(kakaoTokens);
			// const parsedUser = JSON.parse(user);
			console.log('KAKAOTOKENS: ', parsedKakaoTokens);
			console.log('USER: ', user);

			window.localStorage.setItem(ACCESS_TOKEN, parsedKakaoTokens.access_token);
			window.localStorage.setItem(REFRESH_TOKEN, parsedKakaoTokens.refresh_token);
			window.localStorage.setItem(EXPIRES_IN, parsedKakaoTokens.expires_in);
			window.localStorage.setItem(REFRESH_TOKEN_EXPIRES_IN, parsedKakaoTokens.refresh_token_expires_in);

			const kakaoAuth = {
				accessToken: window.localStorage.getItem(ACCESS_TOKEN),
				refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
				expiresIn: window.localStorage.getItem(EXPIRES_IN),
				refreshTokenExpiresIn: window.localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN),
				user: user
			};

			// After converting the auth code to access code, remove auth code from local storage.
			window.localStorage.removeItem('kakaoAuthCode');

			dispatch(setKakaoToken(kakaoAuth));
			return kakaoAuth;
		}
		catch (err) {
			console.log(err);
			return { err };
		}
	};
};


// kakaoAuth Reducer
const initialState = {
	accessToken: window.localStorage.getItem(ACCESS_TOKEN),
	refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
	expiresIn: window.localStorage.getItem(EXPIRES_IN),
	refreshTokenExpiresIn: window.localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN)
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_KAKAO_TOKEN:
			return action.kakaoAuth;
		default:
			return state;
	}
};

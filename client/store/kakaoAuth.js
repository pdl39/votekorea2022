import axios from 'axios';

// Action Types
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const EXPIRES_IN = 'expiresIn';
const REFRESH_TOKEN_EXPIRES_IN = 'refreshTokenExpiresIn';
const SET_KAKAO_TOKEN = 'SET_KAKAO_TOKEN';

// Action Creators
const setKakaoToken = kakaoToken => {
	return {
		type: SET_KAKAO_TOKEN,
		kakaoToken,
	};
};

// Thunks
export const getKakaoToken = authCode => {
	return async dispatch => {
		try {
			const { data } = await axios.post(`kakaoauth/login`, {
				code: authCode
			});

			window.localStorage.setItem(ACCESS_TOKEN, data.access_token);
			window.localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
			window.localStorage.setItem(EXPIRES_IN, data.expires_in);
			window.localStorage.setItem(REFRESH_TOKEN_EXPIRES_IN, data.refresh_token_expires_in);

			const kakaoToken = {
				accessToken: window.localStorage.getItem(ACCESS_TOKEN),
				refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
				expiresIn: window.localStorage.getItem(EXPIRES_IN),
				refreshTokenExpiresIn: window.localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN),
			};

			// After converting the auth code to access code, remove auth code from local storage.
			window.localStorage.removeItem('kakaoAuthCode');

			dispatch(setKakaoToken(kakaoToken));
			return kakaoToken;
		}
		catch (err) {
			console.log(err);
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
			return action.kakaoToken;
		default:
			return state;
	}
};

import axios from 'axios';

// Action Types
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const EXPIRES_IN = 'expiresIn';
const SET_KAKAO_AUTH = 'SET_KAKAO_AUTH';

// Action Creators
const setKakaoAuth = kakaoAuth => {
	return {
		type: SET_KAKAO_AUTH,
		kakaoAuth,
	};
};

// Thunk Creators
export const kakaoAuthenticate = authCode => {
	return async dispatch => {
		try {
			const { data } = await axios.post(`/kakao/login`, {
				code: authCode,
			});
			window.localStorage.setItem(ACCESS_TOKEN,data.accessToken);
			window.localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
			window.localStorage.setItem(EXPIRES_IN, data.expiresIn);

			// After converting the auth code to access code, set local storage value to 'authenticated'.
			window.localStorage.setItem('kakaoAuthCode', 'authenticated');

			dispatch(
				setKakaoAuth({
					accessToken: window.localStorage.getItem(ACCESS_TOKEN),
					refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
					expiresIn: window.localStorage.getItem(EXPIRES_IN),
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
};

// export const reAuthenticate = authCode => {
// 	return async dispatch => {
// 		try {
// 			const refreshToken = window.localStorage.getItem(REFRESH_TOKEN);
// 			const { data }  = await axios.post(`http://localhost:3032/kakao/refresh`, {refreshToken});
// 			setAccessToken(data.accessToken);
// 			setExpiresIn(data.expiresIn);
// 		}
// 		catch {
// 			window.location.href = '/';
// 		}
// 	}
// }


// kakaoAuth Reducer
const initialState = {
	accessToken: window.localStorage.getItem(ACCESS_TOKEN),
	refreshToken: window.localStorage.getItem(ACCESS_TOKEN),
	expiresIn: window.localStorage.getItem(ACCESS_TOKEN)
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_KAKAO_AUTH:
			return action.kakaoAuth;
		default:
			return state;
	}
};

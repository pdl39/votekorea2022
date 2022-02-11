const router = require('express').Router();
const { newErr, runCommand } = require('../../utils');
const User = require('../../db/models/User');
const Choice = require('../../db/models/Choice');
const registerUser = require('./registerUser');
const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = process.env;
const kakaoApiUrlGetToken = 'https://kauth.kakao.com/oauth/token';
const kakaoApiUrlGetUserInfo = 'https://kapi.kakao.com/v2/user/me';
const kakaoApiUrlGetTokenInfo = 'https://kapi.kakao.com/v1/user/access_token_info';

// POST /kakaoauth/login
router.post('/login', async (req, res, next) => {
	try {
		// GET ACCESS_TOKEN FROM KAKAO
		const kakaoTokens = await runCommand(`curl POST ${kakaoApiUrlGetToken} \
		-H "Content-Type: application/x-www-form-urlencoded" \
		-d "grant_type=authorization_code" \
		-d "client_id=${CLIENT_ID}" \
		-d "client_secret=${CLIENT_SECRET}" \
		--data-urlencode "redirect_uri=${REDIRECT_URI}" \
		-d "code=${req.body.code}"`);
		console.log('KAKAO_TOKENS: ', kakaoTokens);

		const parsedKakaoTokens = JSON.parse(kakaoTokens);

		// Throw 500 for any unexpected error
		if (!kakaoTokens.length) {
			throw newErr('kakao_access_token_request_error');
		}

		// Throw error received from Kakao
		if (parsedKakaoTokens.error) {
			if (parsedKakaoTokens.error = 'invalid_grant') {
				throw newErr(parsedKakaoTokens.error, 401);
			}
			throw newErr(parsedKakaoTokens.error, 400);
		}

		// USE ACCESS_TOKEN TO REGISTER USER (IF DOESN'T EXIT) AND RETURN TOKEN & USER DATA
		if (parsedKakaoTokens.access_token) {
			const kakaoUserInfo = await runCommand(`curl GET ${kakaoApiUrlGetUserInfo} \
			-H "Authorization: Bearer ${parsedKakaoTokens.access_token}"`);
			console.log('KAKAO USER INFO: ', JSON.parse(kakaoUserInfo));

			const parsedKakaoUserInfo = JSON.parse(kakaoUserInfo);
			const user = await registerUser(parsedKakaoUserInfo);

			if (!req.body.postId && !req.body.chosenItemId) {
				res.send({ kakaoTokens, user });
			}
			else {
				// CREATE CHOICE INSTANCE IN DATABASE FOR THE USER (IF POSTID & ITEMID IN REQ.BODY)
				if (req.body.postId && req.body.chosenItemId) {
					try {
						// FIRST SEE IF A CHOICE ALREADY EXISTS:
							const choice = await Choice.findOne({
								where: {
									userId: user.id,
									postId: req.body.postId
								}
							});
						if (!choice) { // If a choice doesn't exist, create choice and send back normal response.
							await Choice.create({
								chosenItemId: req.body.chosenItemId,
								postId: req.body.postId,
								userId: user.id
							})
							res.send({ kakaoTokens, user });
						}
						else { // If choice already exists, add choice
							console.log({
								kakaoTokens,
								user,
								choice
							});
							// user = JSON.stringify(user);
							res.send({ kakaoTokens, user, choice });
						}
					}
					catch(err) {
						throw newErr(err.message, err.status);
					}
				}
			}

		}
	} catch (err) {
		next(err);
	}
});

// POST /kakaoauth/authenticate -> check token status. If valid, return empty token {} and user.
router.post('/authenticate', async (req, res, next) => {
	try {
		// GET TOKEN_INFO FROM KAKAO
		const kakaoTokenInfo = await runCommand(`curl GET ${kakaoApiUrlGetTokenInfo} \
		-H "Authorization: Bearer ${req.body.accessToken}"`);
		console.log('KAKAO_TOKEN_INFO: ', kakaoTokenInfo);
		const parsedKakaoTokenInfo = JSON.parse(kakaoTokenInfo);
		let kakaoTokens = {};
		let user = {};

		// Throw 500 for any unexpected error
		if (!kakaoTokenInfo.length) {
			throw newErr('kakao_authenticate_request_error', 500);
		}

		// Convert negative code from Kakao to positive.
		if (parsedKakaoTokenInfo.code && parsedKakaoTokenInfo.code < 0) {
			parsedKakaoTokenInfo.code *= -1;
		}

		const requiresTokenRefresh = (parsedKakaoTokenInfo.id && parsedKakaoTokenInfo.expires_in < 300)
		|| (parsedKakaoTokenInfo && parsedKakaoTokenInfo.code === 401);


		if (parsedKakaoTokenInfo.code && parsedKakaoTokenInfo.code !== 401) {
			throw newErr(parsedKakaoTokenInfo.msg, parsedKakaoTokenInfo.code);
		}

		if (!requiresTokenRefresh) { // get user from db
			try {
				user = await User.findOne({
					where: {
						kakaoUuid: parsedKakaoTokenInfo.id
					}
				});
			}
			catch(err) {
				throw newErr(err.message, err.status);
			}
		}
		else { // refresh token & get user from db
			try {
				// REFRESH TOKEN FROM KAKAO
				const newKakaoTokens = await runCommand(`curl POST ${kakaoApiUrlGetToken} \
				-H "Content-Type: application/x-www-form-urlencoded" \
				-d "grant_type=refresh_token" \
				-d "client_id=${CLIENT_ID}" \
				-d "client_secret=${CLIENT_SECRET}" \
				-d "refresh_token=${req.body.refreshToken}"`);
				console.log('NEW_KAKAO_TOKENS: ', newKakaoTokens);
				const parsedNewKakaoTokens = JSON.parse(newKakaoTokens);

				// Throw 500 for any unexpected error
				if (!newKakaoTokens.length) {
					throw newErr('kakao_refresh_token_request_error: Refresh token could have expired. May need fresh new login.');
				}

				// Throw error received from Kakao
				if (parsedNewKakaoTokens.error) {
					if (parsedNewKakaoTokens.error === 'invalid_grant') {
						throw newErr(parsedNewKakaoTokens.error, 401);
					}
					throw newErr(parsedNewKakaoTokens.error, 400);
				}

				if (parsedNewKakaoTokens.access_token) {
					// GET TOKEN_INFO FROM KAKAO
					const newKakaoTokenInfo = await runCommand(`curl GET ${kakaoApiUrlGetTokenInfo} \
					-H "Authorization: Bearer ${parsedNewKakaoTokens.access_token}"`);
					console.log('NEW_KAKAO_TOKEN_INFO: ', newKakaoTokenInfo);
					const parsedNewKakaoTokenInfo = JSON.parse(newKakaoTokenInfo);

					// Throw 500 for any unexpected error
					if (!newKakaoTokenInfo.length) {
						throw newErr('kakao_authenticate_request_error');
					}

					// Convert negative code from Kakao to positive.
					if (parsedKakaoTokenInfo.code && parsedKakaoTokenInfo.code < 0) {
						parsedKakaoTokenInfo.code *= -1;
					}

					// FETCH USER INFO
					user = await User.findOne({
						where: {
							kakaoUuid: parsedNewKakaoTokenInfo.id
						}
					});

					kakaoTokens = parsedNewKakaoTokens;
				}
			}
			catch(err) {
				throw newErr(err.message, err.status);
			}
		}

		res.send({ kakaoTokens, user });
	} catch (err) {
		next(err);
	}
});

module.exports = router;

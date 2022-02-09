const router = require('express').Router();
const { newErr, runCommand } = require('../../utils');
const { REDIRECT_URI, CLIENT_ID } = process.env;
const kauthUrl = 'https://kauth.kakao.com/oauth/token';
const kapiUrl = 'https://kapi.kakao.com/v2/user/me';

// POST /kakaoauth/login
router.post('/login', async (req, res, next) => {
	try {
		const kakaoTokens = await runCommand(`curl POST ${kauthUrl} \
		-H "Content-Type: application/x-www-form-urlencoded" \
		-d "grant_type=authorization_code" \
		-d "client_id=${CLIENT_ID}" \
		--data-urlencode "redirect_uri=${REDIRECT_URI}" \
		-d "code=${req.body.code}"`);
		console.log('BODY: ', kakaoTokens);

		const parsedKakaoTokens = JSON.parse(kakaoTokens);

		if (!kakaoTokens.length) {
			throw newErr(400, 'POST request error');
		}
		if (parsedKakaoTokens.error) {
			throw newErr(400, parsedKakaoTokens.error);
		}
		if (parsedKakaoTokens.access_token) {
			const kakaoUserInfo = await runCommand(`curl GET ${kapiUrl} \
			-H "Authorization: Bearer ${parsedKakaoTokens.access_token}"`);
			console.log('KAKAO USER INFO: ', JSON.parse(kakaoUserInfo));

			const parsedKakaoUserInfo = JSON.parse(kakaoUserInfo);
		}

		res.send(kakaoTokens);
	} catch (err) {
		console.log(err.stack);
		next(err);
	}
});

module.exports = router;

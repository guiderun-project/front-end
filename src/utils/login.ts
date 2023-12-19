export const getKakaoOauthUrl = (redirectUrl: string) =>
  `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_APP_KEY}&redirect_uri=${redirectUrl}`;

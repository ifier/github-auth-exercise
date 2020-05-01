export const config = {
  clientId: 'ca2c4b2be489d377f5cf',
  clientSecret: '041bd3a2da65bbc24e3b2305b5fc54b8e7f73a54',
  githubApi: 'https://api.github.com',
  oauthPort: 443,
  oauthCodeUrl: 'https://github.com/login/oauth/authorize',
  oauthTokenUrl: 'http://localhost:9999/',
  redirectUrl: 'http://localhost:3000/login'
};

export const getOauthCodeEndPoint = () => {
  return `${config.oauthCodeUrl}?client_id=${config.clientId}&redirect_url=${config.redirectUrl}&scope=user`;
};

export const getHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

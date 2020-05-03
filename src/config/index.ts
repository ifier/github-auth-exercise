export const config = {
  clientId: '',
  clientSecret: '',
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

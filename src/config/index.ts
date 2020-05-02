export const config = {
  clientId: 'c7af81e99f248ad294b6',
  clientSecret: 'ee1a8f44f2f6c96ac604e1a92f28303e85dda04a',
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

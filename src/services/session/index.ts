const getTokenFromStorage = (): any => {
  const token = localStorage.getItem('token');

  return token ? JSON.parse(token) : '';
};

const setTokenToStorage = (token: string) => {
  return localStorage.setItem('token', JSON.stringify(token));
};

const isAuthenticated = () => {
  return !!getTokenFromStorage();
};

const getAccessToken = () => {
  const token = getTokenFromStorage();

  return token?.access_token || '';
};

const getTokenType = () => {
  const token = getTokenFromStorage();

  return token?.token_type || '';
};

const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
};

export const SessionService = {
  getAccessToken,
  getTokenFromStorage,
  setTokenToStorage,
  getTokenType,
  isAuthenticated,
  removeTokenFromStorage
};

const getTokenFromStorage = (): string => {
  return localStorage.getItem('token') || '';
};

const setTokenToStorage = (token: string) => {
  return localStorage.setItem('token', JSON.stringify(token));
};

const isAuthenticated = () => {
  return !!getTokenFromStorage();
};

export const SessionService = {
  getTokenFromStorage,
  setTokenToStorage,
  isAuthenticated
};

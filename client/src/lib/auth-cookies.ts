import Cookies from 'js-cookie';

const ACCESS_TOKEN = 'access';
const REFRESH_TOKEN = 'refresh';

export const setAuthTokens = (access: string, refresh?: string) => {
  Cookies.set(ACCESS_TOKEN, access, {
    expires: new Date(Date.now() + 15 * 60 * 1000),
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
  });

  if (refresh) {
    Cookies.set(REFRESH_TOKEN, refresh, {
      expires: 7,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      path: '/',
    });
  }
};

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN);

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN);

export const removeAuthTokens = () => {
  Cookies.remove(ACCESS_TOKEN, { path: '/' });
  Cookies.remove(REFRESH_TOKEN, { path: '/' });
};

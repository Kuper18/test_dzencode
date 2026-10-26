import axios from 'axios';
import { API_CONFIG } from '../lib/axios-instance';
import { removeAuthTokens, setAuthTokens } from '../lib/auth-cookies';
import type { AuthResponse, LoginPayload, SignupPayload } from '../types';

class AuthApi {
  private static readonly loginUrl = '/users/login/';
  private static readonly signupUrl = '/users/register/';
  private static readonly refreshTokenUrl = '/users/token-refresh/';

  private static saveTokens(response: AuthResponse): AuthResponse {
    setAuthTokens(response.access, response.refresh);
    return response;
  }

  static async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      this.loginUrl,
      payload,
      API_CONFIG
    );

    return this.saveTokens(response.data);
  }

  static async signup(payload: SignupPayload): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      this.signupUrl,
      payload,
      API_CONFIG
    );

    return this.saveTokens(response.data);
  }

  static logout() {
    removeAuthTokens();
  }

  static async refreshToken(
    token: string
  ): Promise<Omit<AuthResponse, 'refresh'>> {
    const response = await axios.post(
      this.refreshTokenUrl,
      { refresh: token },
      API_CONFIG
    );
    return response.data;
  }
}

export default AuthApi;

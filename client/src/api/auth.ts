import axios from 'axios';
import type { AuthResponse, LoginPayload, SignupPayload } from './types';
import { API_CONFIG } from '../lib/axios-instance';
import { setAuthTokens } from '../lib/auth-cookies';

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

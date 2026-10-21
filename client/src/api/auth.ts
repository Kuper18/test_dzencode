import axios from 'axios';
import type { AuthResponse, LoginPayload, SignupPayload } from './types';
import { API_CONFIG } from '../lib/axios-instance';

class AuthApi {
  private static readonly loginUrl = '/users/login/';
  private static readonly signupUrl = '/users/register/';

  static async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await axios.post(this.loginUrl, payload, API_CONFIG);
    return response.data;
  }

  static async signup(payload: SignupPayload): Promise<AuthResponse> {
    const response = await axios.post(this.signupUrl, payload, API_CONFIG);
    return response.data;
  }
}

export default AuthApi;

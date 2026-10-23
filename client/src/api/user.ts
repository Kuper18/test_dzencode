import axiosInstance from '../lib/axios-instance';
import type { UserProfileResponse } from '../types';

class UserApi {
  private static readonly userUrl = '/users/me/';

  static async getCurrentUser(): Promise<UserProfileResponse> {
    const response = await axiosInstance.get(this.userUrl);
    return response.data;
  }
}

export default UserApi;

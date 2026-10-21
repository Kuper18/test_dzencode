import useAppMutation from './use-app-mutation';
import type { LoginPayload } from '../api/types';
import AuthApi from '../api/auth';

const useLogin = () => {
  return useAppMutation({
    mutationFn: (data: LoginPayload) => AuthApi.login(data),
    onSuccess: () => console.log('Login successful!'),
  });
};

export default useLogin;

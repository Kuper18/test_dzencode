import type { SignupPayload } from '../api/types';
import AuthApi from '../api/auth';
import useAppMutation from './use-app-mutation';

const useSignup = () => {
  return useAppMutation({
    mutationFn: (data: SignupPayload) => AuthApi.signup(data),
    onSuccess: () => {
      console.log('Signup successful');
    },
  });
};

export default useSignup;

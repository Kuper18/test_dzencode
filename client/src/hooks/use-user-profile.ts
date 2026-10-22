
import UserApi from '../api/user';
import QUERY_KEYS from '../constants/query-keys';
import useAppQuery from './use-app-query';

const useUserProfile = () => {
  const { data: profile, ...rest } = useAppQuery({
    queryKey: [QUERY_KEYS.userProfile],
    queryFn: () => UserApi.getCurrentUser(),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { profile, ...rest };
};

export default useUserProfile;

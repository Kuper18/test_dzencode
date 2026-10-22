import { Image } from 'react-bootstrap';
import useUserProfile from '../hooks/use-user-profile';

const ProfileInfo = () => {
  const { profile } = useUserProfile();

  if (!profile) return null

  return (
    <div className="d-flex flex-column align-items-center gap-3 mb-4 py-2 text-center">
      <Image
        roundedCircle
        src={`https://placehold.co/64x64?text=${profile?.first_name?.charAt(0) || ''}${profile?.last_name?.charAt(0) || ''}`}
        alt={profile?.full_name || 'User Avatar'}
        width={56}
        height={56}
      />

      <div className="overflow-hidden w-100">
        <div className="fw-semibold">{profile?.full_name || ''}</div>
        <small className="text-secondary text-break">
          {profile?.email || ''}
        </small>
      </div>
    </div>
  );
};

export default ProfileInfo;

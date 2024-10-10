import { Avatar } from '@mui/material';

interface ProfileImageProps {
  size: number;
  img?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ size, img }) => {
  if (img) {
    return (
      <Avatar
        aria-hidden
        alt="프로필 사진"
        src={img}
        sx={{ width: size, height: size }}
      />
    );
  }

  return (
    <Avatar
      aria-hidden
      alt="프로필 사진 설정 안됨"
      sx={{ bgcolor: '#D9D9D9', width: size, height: size }}
    ></Avatar>
  );
};

export default ProfileImage;
